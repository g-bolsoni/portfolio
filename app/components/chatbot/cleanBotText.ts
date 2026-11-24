/**
 * Limpa vícios comuns do modelo local antes de renderizar:
 * - resposta inteira dentro de um bloco ```markdown ... ```;
 * - primeira linha que é só a palavra "Markdown" (eco da instrução do prompt).
 * Funciona com texto parcial (streaming).
 */
export function cleanBotText(text: string): string {
  let result = text.replace(/^\s+/, "");

  const fence = result.match(/^```(?:markdown|md)[ \t]*\r?\n?/i);
  if (fence) {
    result = result.slice(fence[0].length).replace(/\r?\n?```\s*$/, "");
  }

  result = result.replace(/^\s*#{0,6}\s*\**markdown\**\s*:?\s*(\r?\n|$)/i, "");

  return result;
}
