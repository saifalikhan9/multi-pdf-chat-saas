import prisma from "@/lib/prisma"
import { auth } from "@/services/auth/auth"
import type { Message } from "@/components/chat/chat-history"

export async function getChats(docId: string): Promise<Message[]> {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  try {
    const chats = await prisma.chat.findMany({
      where: { userId: session.user.id, docId },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        question: true,
        answer: true,
      },
    })
    console.log(chats);
    

    return chats.flatMap((c) => [
      { role: "user", content: c.question },
      { role: "assistant", content: c.answer },
    ])
  } catch (error) {
    console.error("Failed to fetch chats:", error)
    throw new Error("Failed to fetch chats")
  }
}