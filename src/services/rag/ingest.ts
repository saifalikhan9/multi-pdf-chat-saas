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

  const BATCH_SIZE = 50;

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {

    const batchChunks = chunks.slice(i, i + BATCH_SIZE);

    const vectors = await embeddings.embedDocuments(batchChunks);

    const records = vectors.map((values, j) => ({
      id: `${docId}-${i + j}`,
      values,
      metadata: {
        text: batchChunks[j],
        userId,
        docName,
        docId,
        chunk: i + j,
      },
    }));

    await pineconeIndex
      .namespace(userId)
      .upsert({ records });

    console.log(`Embedded batch ${i / BATCH_SIZE + 1}`);
  }

  return {
    chunks: chunks.length,
    docName,
  };
}