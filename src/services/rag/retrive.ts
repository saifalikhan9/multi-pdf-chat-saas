import { vectorStore } from "@/lib/pinecone";

export async function retrieveChunks(question: string, userId: string) {
 

  const docs = await vectorStore.similaritySearch(question, 5, {
    userId,
  });

  return docs.map((d) => ({
    text: d.pageContent,
    metadata: d.metadata,
  }));
}