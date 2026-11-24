"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { checkRequirements, type RequirementsStatus } from "@/lib/chatbot/checkRequirements";
import { PromptService, isAbortError, isQuotaExceeded } from "@/lib/chatbot/promptService";
import type { ChatLabels, ChatMessageData } from "./types";

type Options = {
  /** systemPrompt.txt + llms.txt já concatenados. */
  systemPrompt: string;
  locale: string;
  labels: ChatLabels;
  firstMessage: string;
};

type Phase = "idle" | "starting" | "ready" | "generating" | "unavailable";

/** Intervalo de atualização da mensagem durante o streaming (ms). */
const FLUSH_INTERVAL = 150;

const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

/**
 * Controller do chatbot: verifica requisitos, cria a sessão do modelo (a partir
 * do clique em "abrir", que é o gesto exigido para baixar o modelo), faz o
 * streaming das respostas e permite interromper.
 */
export function useChatbot({ systemPrompt, locale, labels, firstMessage }: Options) {
  const [messages, setMessages] = useState<ChatMessageData[]>([
    { id: "welcome", role: "bot", text: firstMessage },
  ]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typing, setTyping] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  const serviceRef = useRef<PromptService | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const startedRef = useRef(false);
  const mountedRef = useRef(true);

  if (serviceRef.current === null) serviceRef.current = new PromptService();

  useEffect(() => {
    mountedRef.current = true;
    const service = serviceRef.current;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
      service?.destroy();
    };
  }, []);

  const addBotMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: uid("b"), role: "bot", text }]);
  }, []);

  const unavailableText = useCallback(
    (status: RequirementsStatus): string => {
      if (status === "unsupported-browser") return labels.unsupportedBrowser;
      if (status === "api-missing") return labels.apiMissing;
      return labels.unavailable;
    },
    [labels],
  );

  /** Chamar no clique de abrir o chat. Inicializa o modelo uma única vez. */
  const start = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setPhase("starting");
    setLoadingModel(true);
    const t0 = performance.now();
    const log = (step: string, extra?: unknown) =>
      console.info(`[chatbot] ${step} (+${Math.round(performance.now() - t0)}ms)`, extra ?? "");

    try {
      log("verificando requisitos");
      const { status, languageOptions } = await checkRequirements();
      log("requisitos", { status, languageOptions });

      if (!languageOptions) {
        if (!mountedRef.current) return;
        addBotMessage(unavailableText(status));
        setPhase("unavailable");
        return;
      }

      if (status !== "available") setDownloadProgress(0);

      log("criando sessão");
      await serviceRef.current!.init({
        systemPrompt: `${systemPrompt}\n\nIdioma atual do site: ${locale}.`,
        languageOptions,
        onDownloadProgress: (loaded) => {
          if (mountedRef.current) setDownloadProgress(loaded);
        },
      });

      log("sessão pronta");
      if (!mountedRef.current) return;
      setPhase("ready");
    } catch (error) {
      console.error("Chatbot: falha ao iniciar o modelo", error);
      startedRef.current = false; // permite tentar de novo na próxima abertura
      if (!mountedRef.current) return;
      addBotMessage(labels.errorGeneric);
      setPhase("idle");
    } finally {
      if (mountedRef.current) {
        setLoadingModel(false);
        setDownloadProgress(null);
      }
    }
  }, [addBotMessage, labels.errorGeneric, locale, systemPrompt, unavailableText]);

  const send = useCallback(
    async (text: string) => {
      const service = serviceRef.current;
      if (!service || !service.ready) return;

      const botId = uid("b");
      const controller = new AbortController();
      abortRef.current = controller;

      setMessages((prev) => [...prev, { id: uid("u"), role: "user", text }]);
      setPhase("generating");
      setTyping(true);

      let full = "";
      let flushed = "";
      const flush = () => {
        if (full === flushed) return;
        flushed = full;
        const snapshot = full;
        setTyping(false);
        setMessages((prev) =>
          prev.some((m) => m.id === botId)
            ? prev.map((m) => (m.id === botId ? { ...m, text: snapshot } : m))
            : [...prev, { id: botId, role: "bot", text: snapshot }],
        );
      };
      const intervalId = window.setInterval(flush, FLUSH_INTERVAL);

      try {
        await service.prompt(text, {
          signal: controller.signal,
          onChunk: (chunk) => {
            full += chunk;
          },
        });
      } catch (error) {
        if (!isAbortError(error)) {
          console.error("Chatbot: erro na resposta da IA", error);
          const message = isQuotaExceeded(error) ? labels.errorContextFull : labels.errorGeneric;
          full = full ? `${full}\n\n${message}` : message;
        }
        // AbortError: mantém o texto parcial já recebido.
      } finally {
        window.clearInterval(intervalId);
        abortRef.current = null;
        if (mountedRef.current) {
          flush();
          setTyping(false);
          setPhase("ready");
        }
      }
    },
    [labels.errorContextFull, labels.errorGeneric],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return {
    messages,
    typing,
    loadingModel,
    downloadProgress,
    generating: phase === "generating",
    inputDisabled: phase !== "ready",
    start,
    send,
    stop,
  };
}
