// import { PineconeStore } from "@langchain/pinecone";
// import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
// import { embeddings } from "./embedding";

// const pinecone = new PineconeClient({
//   apiKey: process.env.PINECONE_API_KEY!,
// });
// const pineconeIndex = pinecone.Index("pdf-chat");

// export async function getVectorStore() {
//   return await PineconeStore.fromExistingIndex(embeddings, {
//     pineconeIndex,
//     maxConcurrency: 5,
//   });
// }

// lib/pinecone.ts
import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const pineconeIndex = pinecone.Index("pdf-chat");