import { readFile } from "node:fs/promises";
import path from "node:path";
import ChatbotClient from "./ChatbotClient";

let promptPromise: Promise<string> | null = null;

/** systemPrompt.txt + llms.txt (mesmo arquivo servido publicamente em /llms.txt). */
function loadSystemPrompt(): Promise<string> {
  if (!promptPromise) {
    promptPromise = Promise.all([
      readFile(path.join(process.cwd(), "app", "botData", "systemPrompt.txt"), "utf8"),
      readFile(path.join(process.cwd(), "public", "llms.txt"), "utf8"),
    ]).then(([systemPrompt, llmsTxt]) => `${systemPrompt}\n${llmsTxt}`);
    promptPromise.catch(() => {
      promptPromise = null;
    });
  }
  return promptPromise;
}

export default async function ChatbotLoader({ locale }: { locale: string }) {
  const systemPrompt = await loadSystemPrompt();
  return <ChatbotClient systemPrompt={systemPrompt} locale={locale} />;
}
