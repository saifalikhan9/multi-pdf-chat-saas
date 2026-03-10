import prisma from "@/lib/prisma";

/**
 * Server-side only. Use in Server Components with an authenticated userId.
 */
export async function getDocuments(userId: string) {
  return prisma.document.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      chunkCount: true,
      createdAt: true,
    },
  });
}

/**
 * Server-side only. Use in Server Components with an authenticated userId.
 * Returns null if document not found or not owned by user.
 */
export async function getDocumentById(id: string, userId: string) {
  return prisma.document.findFirst({
    where: { id, userId },
  });
}
