import { Pinecone } from "@pinecone-database/pinecone";

export async function GET() {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return Response.json({
    ok: true,
    index: process.env.PINECONE_INDEX,
  });
}