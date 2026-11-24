"use client";

import dynamic from "next/dynamic";

// Carregado só no cliente e em um chunk separado: o chat não pesa no primeiro load.
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ChatbotClient(props: { systemPrompt: string; locale: string }) {
  return <Chatbot {...props} />;
}
