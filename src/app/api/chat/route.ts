import { auth } from "@/services/auth/auth";
import prisma from "@/lib/prisma";

import { buildContext } from "@/services/rag/context";
import { generateAnswer } from "@/services/rag/generate";
import { retrieveChunks } from "@/services/rag/retrive";

export async function POST(req: Request) {
  try {
    // 🔐 Auth check
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // 📥 Parse request
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Invalid question" }, { status: 400 });
    }

    // 🔎 Retrieve relevant chunks (LangChain Pinecone)
    const docs = await retrieveChunks(question, userId);

    // 🧾 Build RAG context
    const context = buildContext(docs);

    // 🤖 Generate grounded answer
    const answer = await generateAnswer(question, context);
    const answerString =
      typeof answer === "string" ? answer : JSON.stringify(answer);

    // 💾 Save chat history
    await prisma.chat.create({
      data: {
        userId,
        question,
        answer: answerString,
      },
    });

    // 📤 Response with citations
    return Response.json({
      answer,
      citations: docs.map((d) => ({
        doc: d.metadata.docName,
        chunk: d.metadata.chunk,
        docId: d.metadata.docId,
      })),
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json({ error: "Chat failed" }, { status: 500 });
  }
}