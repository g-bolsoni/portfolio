"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import styles from "./chatbot.module.css";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import type { ChatLabels, ChatMessageData } from "./types";

type Props = {
  labels: ChatLabels;
  avatar: StaticImageData;
  messages: ChatMessageData[];
  /** Mostra os três pontos enquanto o bot "pensa". */
  typing: boolean;
  /** Modelo sendo verificado/carregado (sem % de download). */
  loadingModel: boolean;
  /** Há uma resposta sendo gerada (troca Enviar por Parar). */
  generating: boolean;
  /** Input bloqueado (modelo carregando, indisponível etc.). */
  inputDisabled: boolean;
  /** 0 a 1 enquanto o modelo é baixado; null caso contrário. */
  downloadProgress: number | null;
  onSend: (text: string) => void;
  onStop: () => void;
  onClose: () => void;
};

export default function ChatWindow({
  labels,
  avatar,
  messages,
  typing,
  loadingModel,
  generating,
  inputDisabled,
  downloadProgress,
  onSend,
  onStop,
  onClose,
}: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rola até o fim a cada mensagem nova ou atualização de streaming.
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages, typing, loadingModel, downloadProgress]);

  // Foca o input ao abrir.
  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(id);
  }, []);

  // Devolve o foco ao input quando ele é reabilitado.
  useEffect(() => {
    if (!inputDisabled) inputRef.current?.focus();
  }, [inputDisabled]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  };

  const percent = downloadProgress === null ? 0 : Math.round(downloadProgress * 100);

  return (
    <div
      className={styles.window}
      role="dialog"
      aria-label={labels.name}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <Image src={avatar} alt="" width={28} height={28} className={styles.headerLogo} />
        <span className={styles.name}>{labels.name}</span>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={labels.close}
        >
          &times;
        </button>
      </div>

      <div className={styles.body} ref={bodyRef} role="log" aria-live="polite">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} avatar={avatar} />
        ))}

        {downloadProgress !== null && (
          <div className={styles.progress}>
            <p className={styles.progressLabel}>{labels.downloading}</p>
            <div
              className={styles.progressBarBg}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
            >
              <div className={styles.progressBarFill} style={{ width: `${percent}%` }}>
                {percent}%
              </div>
            </div>
          </div>
        )}

        {loadingModel && downloadProgress === null && (
          <div className={styles.progress}>
            <p className={styles.progressLabel}>{labels.loadingModel}</p>
          </div>
        )}

        {typing && (
          <div className={styles.typing} aria-hidden="true">
            <span className={styles.typingDot} />
            <span className={styles.typingDot} />
            <span className={styles.typingDot} />
          </div>
        )}
      </div>

      <ChatInput
        ref={inputRef}
        labels={labels}
        disabled={inputDisabled}
        generating={generating}
        onSend={onSend}
        onStop={onStop}
      />
    </div>
  );
}
