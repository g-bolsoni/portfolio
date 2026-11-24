import type { LanguageModelOptions, ModelAvailability } from "./types";

export type RequirementsStatus =
  | "unsupported-browser" // não é Chrome/Chromium
  | "api-missing" // Chromium, mas sem window.LanguageModel (flag desativada/versão antiga)
  | "unavailable" // API existe, mas o dispositivo/idioma não é suportado
  | ModelAvailability;

export type RequirementsResult = {
  status: RequirementsStatus;
  /** Opções de idioma aceitas pelo modelo neste dispositivo (presente quando status != unavailable/missing). */
  languageOptions?: LanguageModelOptions;
};

/**
 * Idiomas que a Prompt API aceita hoje: en, es, ja, de, fr. O português ('pt')
 * NÃO consta na lista oficial, então tentamos pt+en primeiro e, se o Chrome
 * recusar, caímos para 'en' (o modelo ainda costuma entender português, mas
 * sem garantia oficial).
 */
const LANGUAGE_CANDIDATES: string[][] = [["pt", "en"], ["en"]];

function buildOptions(languages: string[]): LanguageModelOptions {
  return {
    expectedInputs: [{ type: "text", languages }],
    expectedOutputs: [{ type: "text", languages }],
  };
}

function isChromium(): boolean {
  if (typeof window === "undefined") return false;
  return "chrome" in window;
}

/**
 * Detecta se o navegador consegue rodar o chatbot e qual é o estado do modelo.
 * Seguro para chamar no cliente; no servidor devolve "unsupported-browser".
 * Não inicia download nem exige gesto do usuário.
 */
export async function checkRequirements(): Promise<RequirementsResult> {
  if (typeof window === "undefined" || !isChromium()) {
    return { status: "unsupported-browser" };
  }

  const api = window.LanguageModel;
  if (!api) return { status: "api-missing" };

  for (const languages of LANGUAGE_CANDIDATES) {
    const languageOptions = buildOptions(languages);
    try {
      const status = await api.availability(languageOptions);
      if (status !== "unavailable") return { status, languageOptions };
    } catch {
      // idioma/opção não suportada: tenta o próximo candidato
    }
  }

  return { status: "unavailable" };
}
