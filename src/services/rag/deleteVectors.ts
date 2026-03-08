import { index } from "@/lib/pinecone";

export async function deleteDocumentVectors(docId: string, userId: string) {
  await index.deleteMany({
    filter: {
      docId,
      userId,
    },
  });
}