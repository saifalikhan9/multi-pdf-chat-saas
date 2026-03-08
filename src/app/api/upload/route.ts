import prisma from "@/lib/prisma";
import { auth } from "@/services/auth/auth";
import { ingestPDF } from "@/services/rag/ingest";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file" }, { status: 400 });
    }

    const userId = session.user.id;
    const bytes = new Uint8Array(await file.arrayBuffer());

    // 1️⃣ Create DB document first
    const doc = await prisma.document.create({
      data: {
        name: file.name,
        userId,
        chunkCount: 0, // temp
      },
    });

    // 2️⃣ Ingest into Pinecone with docId
    const result = await ingestPDF(bytes, userId, file.name, doc.id);

    // 3️⃣ Update chunkCount
    await prisma.document.update({
      where: { id: doc.id },
      data: { chunkCount: result.chunks },
    });

    return Response.json({
      success: true,
      documentId: doc.id,
      chunkCount: result.chunks,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}