"use server"

import { chunkText } from "./chunks";
import { pdfparser } from "@/services/parsePDF";
import { embeddings } from "@/lib/embedding";
import { pineconeIndex } from "@/lib/pinecone";
import prisma from "@/lib/prisma";

export async function ingestPDF(
  fileUrl: string,
  userId: string,
  docName: string,
  docId: string
) {

  const response = await fetch(fileUrl);
  if (!response.ok) throw new Error("Failed to fetch PDF from UploadThing");
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

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
  await prisma.document.update({
    where: { id: docId },
    data: { chunkCount: chunks.length, status: "COMPLETED" },

  });

  console.log(`Successfully ingested ${docName} (${chunks.length} chunks)`);

  return { success: true, chunks: chunks.length, docName };
}