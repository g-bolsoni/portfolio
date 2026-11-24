export type ChatMessageData = {
  id: string;
  role: "bot" | "user";
  text: string;
};

/** Textos da UI. No Grupo F passam a vir do next-intl (namespace "Chatbot"). */
export type ChatLabels = {
  name: string;
  welcomeBubble: string;
  open: string;
  close: string;
  placeholder: string;
  send: string;
  stop: string;
  downloading: string;
  loadingModel: string;
  errorGeneric: string;
  errorContextFull: string;
  unsupportedBrowser: string;
  apiMissing: string;
  unavailable: string;
};

export const DEFAULT_LABELS: ChatLabels = {
  name: "Assistente do Giovane",
  welcomeBubble: "Olá! Quer saber mais sobre o Giovane?",
  open: "Abrir chat",
  close: "Fechar chat",
  placeholder: "Digite sua mensagem...",
  send: "Enviar",
  stop: "Parar geração",
  downloading: "Baixando o modelo de IA...",
  loadingModel: "Carregando o modelo de IA (pode levar alguns segundos)...",
  errorGeneric: "Não consegui obter uma resposta da IA. Tente novamente.",
  errorContextFull:
    "A conversa ficou longa demais para o modelo. Tente uma pergunta mais curta ou recarregue a página.",
  unsupportedBrowser:
    "⚠️ Este assistente roda direto no navegador e só funciona no Google Chrome (versão recente, no computador).",
  apiMissing:
    "⚠️ As APIs nativas de IA do Chrome não estão ativas.\n\nAtive a flag `chrome://flags/#prompt-api-for-gemini-nano`, reinicie o Chrome e tente novamente.",
  unavailable:
    "⚠️ Este dispositivo não atende aos requisitos para rodar o modelo de IA local (espaço em disco, memória e GPU).",
};
