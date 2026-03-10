import { pineconeIndex } from "@/lib/pinecone";

export async function deleteDocumentVectors(docId: string, userId: string) {
  const ns = pineconeIndex.namespace(userId);
  await ns.deleteMany({ docId });
}