/**
 * Tipos mínimos da Prompt API do Chrome (window.LanguageModel).
 * Não existe @types oficial; cobre só o que o chatbot usa.
 * Referência: https://developer.chrome.com/docs/ai/prompt-api
 */

export type ModelAvailability =
  | "unavailable"
  | "downloadable"
  | "downloading"
  | "available";

export type TextLanguages = {
  type: "text";
  languages: string[];
};

export type LanguageModelOptions = {
  expectedInputs?: TextLanguages[];
  expectedOutputs?: TextLanguages[];
};

export type LanguageModelMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type DownloadMonitor = EventTarget & {
  addEventListener(
    type: "downloadprogress",
    listener: (event: Event & { loaded: number }) => void,
  ): void;
};

export type LanguageModelCreateOptions = LanguageModelOptions & {
  initialPrompts?: LanguageModelMessage[];
  monitor?: (monitor: DownloadMonitor) => void;
  signal?: AbortSignal;
};

export type LanguageModelSession = EventTarget & {
  /** Tokens já usados no contexto da sessão. */
  contextUsage?: number;
  /** Tamanho total do contexto da sessão. */
  contextWindow?: number;
  promptStreaming(
    input: string,
    options?: { signal?: AbortSignal },
  ): ReadableStream<string>;
  destroy(): void;
};

export type LanguageModelStatic = {
  availability(options?: LanguageModelOptions): Promise<ModelAvailability>;
  create(options?: LanguageModelCreateOptions): Promise<LanguageModelSession>;
};

declare global {
  interface Window {
    LanguageModel?: LanguageModelStatic;
  }
}
