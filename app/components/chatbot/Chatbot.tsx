"use client";

import { useEffect, useState, type CSSProperties } from "react";
import avatar from "@/app/botData/avatar.webp";
import config from "@/app/botData/chatbot-config.json";
import { checkRequirements, type RequirementsResult } from "@/lib/chatbot/checkRequirements";
import styles from "./chatbot.module.css";
import ChatLauncher from "./ChatLauncher";
import ChatWindow from "./ChatWindow";
import { DEFAULT_LABELS } from "./types";
import { useChatbot } from "./useChatbot";

/** Variáveis CSS de tema, derivadas do chatbot-config.json. */
function buildThemeVars(): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === "string" && /(Color|Bubble|Text)$/.test(key)) {
      vars[`--${key}`] = value;
    }
  }
  const delayMs = Number(config.typingDelay) * 1000 || 1200;
  vars["--typingDotDuration"] = `${Math.max(0.6, (delayMs / 1000) * 0.66)}s`;
  return vars as CSSProperties;
}

const themeVars = buildThemeVars();

type Props = {
  /** systemPrompt.txt + llms.txt, montado no servidor. */
  systemPrompt: string;
  locale: string;
};

/**
 * Só renderiza o widget se o navegador consegue rodar o modelo local
 * (Chrome com a Prompt API e dispositivo compatível). Caso contrário, o
 * visitante não vê nada: nenhum botão quebrado, nenhum erro no console.
 */
export default function Chatbot(props: Props) {
  const [requirements, setRequirements] = useState<RequirementsResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    checkRequirements()
      .then((result) => {
        if (!cancelled) setRequirements(result);
      })
      .catch(() => {
        // falha ao verificar = tratado como sem suporte
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!requirements?.languageOptions) return null;
  return <ChatWidget {...props} requirements={requirements} />;
}

function ChatWidget({
  systemPrompt,
  locale,
  requirements,
}: Props & { requirements: RequirementsResult }) {
  const labels = DEFAULT_LABELS;
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  const chat = useChatbot({
    systemPrompt,
    locale,
    labels,
    firstMessage: config.firstBotMessage,
    requirements,
  });

  const handleOpen = () => {
    setOpen(true);
    setOpened(true);
    void chat.start(); // o clique é o gesto exigido para baixar o modelo
  };

  return (
    <div className={styles.widget} style={themeVars}>
      {!open && (
        <ChatLauncher
          labels={labels}
          avatar={avatar}
          showHints={!opened}
          onOpen={handleOpen}
        />
      )}
      {open && (
        <ChatWindow
          labels={labels}
          avatar={avatar}
          messages={chat.messages}
          typing={chat.typing}
          loadingModel={chat.loadingModel}
          generating={chat.generating}
          inputDisabled={chat.inputDisabled}
          downloadProgress={chat.downloadProgress}
          onSend={chat.send}
          onStop={chat.stop}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
