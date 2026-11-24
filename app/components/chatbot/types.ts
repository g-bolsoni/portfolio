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
};
