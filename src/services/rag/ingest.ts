"use server"

import { chunkText } from "./chunks";
import { pdfparser } from "@/services/parsePDF";
import { embeddings } from "@/lib/embedding";
import { pineconeIndex } from "@/lib/pinecone";

export async function ingestPDF(
  buffer: Uint8Array,
  userId: string,
  docName: string,
  docId: string
) {

  const text = await pdfparser(buffer);

  const chunks = chunkText(text);

  const vectors = await embeddings.embedDocuments(chunks);

  const records = vectors.map((values, i) => ({
    id: `${docId}-${i}`,
    values,
    metadata: {
      text: chunks[i],
      userId,
      docName,
      docId,
      chunk: i,
    },
  }));

  await pineconeIndex.namespace(userId).upsert({records});

  return {
    chunks: chunks.length,
    docName,
  };
}