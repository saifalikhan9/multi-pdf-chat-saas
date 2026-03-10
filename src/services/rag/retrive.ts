import { pineconeIndex } from "@/lib/pinecone";
import { embeddings } from "@/lib/embedding";

export async function retrieveChunks(
  question: string,
  userId: string,
  docId?: string
) {
  const queryVector = await embeddings.embedQuery(question);

  const filter: Record<string, { $eq: string }> | undefined = docId
    ? { docId: { $eq: docId } }
    : undefined;

  const result = await pineconeIndex.namespace(userId).query({
    vector: queryVector,
    topK: 5,
    includeMetadata: true,
    ...(filter && { filter }),
  });

  if (!result.matches) return [];

  return result.matches.map((m) => ({
    text: m.metadata?.text,
    metadata: {
      docName: m.metadata?.docName,
      chunk: m.metadata?.chunk,
      docId: m.metadata?.docId,
    },
  }));
}