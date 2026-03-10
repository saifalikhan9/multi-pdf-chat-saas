import prisma from "@/lib/prisma";
import { auth } from "@/services/auth/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const documents = await prisma.document.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        chunkCount: true,
        createdAt: true,
      },
    });

    return Response.json(documents);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to list documents" }, { status: 500 });
  }
}
