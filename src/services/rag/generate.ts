import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { minstral } from "../llms/minstral";

const prompt = PromptTemplate.fromTemplate(`
You are a helpful assistant answering questions about a document.

Use the context below to answer the question.

Rules:
- Prioritize information from the context
- If reasoning is required, infer logically
- If context is insufficient, say what is missing
- Keep answers concise (max 7–10 sentences)

Context:
{context}

Question:
{question}
`);

const chain = RunnableSequence.from([
  prompt,
  minstral,
  new StringOutputParser(),
]);

export async function generateAnswer(question: string, context: string) {
  return chain.stream({
    question,
    context,
  });
}