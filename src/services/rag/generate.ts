import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { minstral } from "../llms/minstral";

const prompt = PromptTemplate.fromTemplate(`
  You are a helpful assistant answering questions about a document.
  
  Use the context below to answer the question.
  
  Rules:
  - Prioritize information from the context.
  - If the answer requires reasoning, infer logically from the context.
  - If the context is insufficient, explain what information is missing.
  - Do not exaggerate the response.
- Keep the answer concise (maximum 7-10 sentences).
- Avoid unnecessary explanations.
  
  Context:
  {context}
  
  Question:
  {question}
  `);

const chain = RunnableSequence.from([
  prompt,
  minstral
]);

export async function generateAnswer(question: string, context: string) {
  const res = await chain.invoke({
    question,
    context
  });

  return res.content;
}