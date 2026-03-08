import { minstral } from "../llms/minstral";

export async function generateAnswer(question: string, context: string) {
  const prompt = `
You are a document assistant.

Answer ONLY using the provided sources.
If not found, say "Not found in documents".

Sources:
${context}

Question: ${question}
`;

  const res = await minstral.invoke(prompt);

  return res.content;
}