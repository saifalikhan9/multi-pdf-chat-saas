import prisma from "@/lib/prisma";
import { auth } from "@/services/auth/auth";
import { deleteDocumentVectors } from "@/services/rag/deleteVectors";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const doc = await prisma.document.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!doc) {
      return Response.json({ error: "Document not found" }, { status: 404 });
    }

    return Response.json(doc);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to get document" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { name } = body as { name?: string };

    if (typeof name !== "string" || !name.trim()) {
      return Response.json({ error: "Invalid name" }, { status: 400 });
    }

    const doc = await prisma.document.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!doc) {
      return Response.json({ error: "Document not found" }, { status: 404 });
    }

    const updated = await prisma.document.update({
      where: { id },
      data: { name: name.trim() },
    });

    return Response.json(updated);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to update document" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const doc = await prisma.document.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!doc) {
      return Response.json({ error: "Document not found" }, { status: 404 });
    }

    try {
      await deleteDocumentVectors(doc.id, session.user.id);
    } catch (vectorErr) {
      console.error("Pinecone delete error (continuing with DB delete):", vectorErr);
    }

    await prisma.document.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to delete document" }, { status: 500 });
  }
}
