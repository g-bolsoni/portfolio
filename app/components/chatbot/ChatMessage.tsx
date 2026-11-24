import Image, { type StaticImageData } from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./chatbot.module.css";
import type { ChatMessageData } from "./types";
import { cleanBotText } from "./cleanBotText";

type Props = {
  message: ChatMessageData;
  avatar: StaticImageData;
};

export default function ChatMessage({ message, avatar }: Props) {
  if (message.role === "user") {
    return (
      <div className={`${styles.message} ${styles.messageUser}`}>
        {/* Texto puro: o React escapa o conteúdo, sem innerHTML. */}
        <div className={styles.content}>{message.text}</div>
      </div>
    );
  }

  return (
    <div className={`${styles.message} ${styles.messageBot}`}>
      <Image src={avatar} alt="" width={30} height={30} className={styles.avatar} unoptimized />
      <div className={styles.content}>
        <ReactMarkdown
          components={{
            a: ({ node: _node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {cleanBotText(message.text)}
        </ReactMarkdown>
      </div>
    </div>
  );
}
