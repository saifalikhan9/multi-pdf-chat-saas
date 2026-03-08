import { ChatMistralAI } from "@langchain/mistralai";

export const minstral = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY!,
  model: "codestral-latest",
  temperature: 0.2,
});