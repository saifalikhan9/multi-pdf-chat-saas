"use server"

import { v4 as uuid } from "uuid";
import { chunkText } from "./chunks";
import { pdfparser } from "@/services/parsePDF";
import { embeddings } from "@/lib/embedding";
import { index } from "@/lib/pinecone";

export async function ingestPDF(
    buffer: Uint8Array,
    userId: string,
    docName: string,
    docId: string
) {


    const text = await pdfparser(buffer)

    const chunks = chunkText(text);

    const vectors = await embeddings.embedDocuments(chunks);

    const records = vectors.map((values, i) => ({
        id: `${docName}-${i}-${uuid()}`,
        values,
        metadata: {
            text: chunks[i],
            docName,
            userId,
            docId,
            chunk: i,
        }
    }));

    await index.upsert({ records });

    return {
        chunks: chunks.length,
        docName,
    };
}