"use client";

import { forwardRef, useState, type FormEvent } from "react";
import styles from "./chatbot.module.css";
import type { ChatLabels } from "./types";

type Props = {
  labels: ChatLabels;
  disabled: boolean;
  generating: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
};

const ChatInput = forwardRef<HTMLInputElement, Props>(function ChatInput(
  { labels, disabled, generating, onSend, onStop },
  inputRef,
) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    setValue("");
    onSend(text);
  };

  return (
    <form className={styles.footer} onSubmit={handleSubmit} autoComplete="off">
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={labels.placeholder}
        aria-label={labels.placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      {generating ? (
        <button
          type="button"
          className={styles.stopBtn}
          onClick={onStop}
          aria-label={labels.stop}
          title={labels.stop}
        >
          ■
        </button>
      ) : (
        <button type="submit" className={styles.sendBtn} disabled={disabled || !value.trim()}>
          {labels.send}
        </button>
      )}
    </form>
  );
});

export default ChatInput;
