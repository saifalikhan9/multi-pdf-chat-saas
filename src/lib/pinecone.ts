import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { embeddings } from "./embedding";

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY!,
});
const pineconeIndex = pinecone.Index("pdf-chat");

export const vectorStore = new PineconeStore(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,  // Control concurrency for bulk operations
});