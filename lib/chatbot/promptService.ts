import type {
  LanguageModelOptions,
  LanguageModelSession,
} from "./types";

export type InitOptions = {
  /** Prompt de sistema completo (systemPrompt.txt + llms.txt). */
  systemPrompt: string;
  /** Opções de idioma vindas de checkRequirements(). */
  languageOptions: LanguageModelOptions;
  /** Progresso do download do modelo, de 0 a 1. */
  onDownloadProgress?: (loaded: number) => void;
  /** Abortar cancela a criação (e destrói a sessão). */
  signal?: AbortSignal;
};

/**
 * Encapsula a sessão da Prompt API. A própria sessão guarda o histórico da
 * conversa, então cada prompt envia apenas o texto novo.
 *
 * `create()` precisa ser chamado a partir de um gesto do usuário (ex.: clique
 * em abrir o chat) quando o modelo ainda precisa ser baixado.
 */
export class PromptService {
  private session: LanguageModelSession | null = null;

  get ready(): boolean {
    return this.session !== null;
  }

  async init({
    systemPrompt,
    languageOptions,
    onDownloadProgress,
    signal,
  }: InitOptions): Promise<void> {
    const api = typeof window !== "undefined" ? window.LanguageModel : undefined;
    if (!api) throw new Error("LanguageModel API unavailable");

    this.destroy();

    this.session = await api.create({
      ...languageOptions,
      initialPrompts: [{ role: "system", content: systemPrompt }],
      signal,
      monitor(monitor) {
        monitor.addEventListener("downloadprogress", (event) => {
          onDownloadProgress?.(event.loaded);
        });
      },
    });
  }

  /**
   * Envia a pergunta e entrega o texto aos poucos.
   * `onChunk` recebe cada pedaço; a promise resolve com a resposta completa.
   * Se `signal` for abortado, rejeita com AbortError (o chamador decide se
   * mantém o texto parcial que já recebeu via `onChunk`).
   */
  async prompt(
    text: string,
    { signal, onChunk }: { signal?: AbortSignal; onChunk?: (chunk: string) => void } = {},
  ): Promise<string> {
    if (!this.session) throw new Error("Session not initialized");

    const stream = this.session.promptStreaming(text, { signal });
    const reader = stream.getReader();
    let full = "";

    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;
        full += value;
        onChunk?.(value);
      }
    } finally {
      reader.releaseLock();
    }

    return full;
  }

  /** Uso do contexto (tokens), quando a API expõe. */
  get contextUsage(): { used: number; total: number } | null {
    const s = this.session;
    if (!s || s.contextUsage == null || s.contextWindow == null) return null;
    return { used: s.contextUsage, total: s.contextWindow };
  }

  /** Registra callback para quando o contexto estourar (mensagens antigas são descartadas). */
  onContextOverflow(listener: () => void): void {
    this.session?.addEventListener("contextoverflow", listener);
  }

  destroy(): void {
    this.session?.destroy();
    this.session = null;
  }
}

/** QuotaExceededError: a mensagem sozinha não cabe na janela de contexto. */
export function isQuotaExceeded(error: unknown): boolean {
  return error instanceof DOMException && error.name === "QuotaExceededError";
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}
