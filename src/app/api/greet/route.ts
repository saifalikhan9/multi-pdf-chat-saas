import prisma from "@/lib/prisma";
import { auth } from "@/services/auth/auth";
import { minstral } from "@/services/llms/minstral";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    const messages = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { document: true }
    });

    if (!messages.length) {
      return new Response(
        "Welcome! Upload your first PDF to start chatting and extracting insights.",
        {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        }
      );
    }

    const orderedMessages = messages.reverse();

    const history = orderedMessages.map((msg, i) => {
      return `
        Message ${i + 1}:
        Document: ${msg.document.name}
        Question: ${msg.question}
        Answer: ${msg.answer}
        `;
    }).join("\n");



    const documents = await prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        name: true,
      },
    });

    const documentList = documents
      .map((doc, i) => `${i + 1}. ${doc.name}`)
      .join("\n");

    const promptTemplate = PromptTemplate.fromTemplate(`
    You are an AI assistant for a PDF chat app.
    
    Here are the user's recent documents:
    {documents}
    
    Here is the user's recent activity:
    {history}
    
    Write a short, friendly 3 or 5 sentence greeting:
    - Welcome them back with the user name {name}.
    - Mention what kind of documents they are working with (if available),
    - Briefly summarize their activity,
    - tell them what they can do further,
    - do not ask question from them.
    
    Keep it natural.
    `);

    const chain = promptTemplate
      .pipe(minstral)
      .pipe(new StringOutputParser());

    // ✅ NO STREAM
    const result = await chain.invoke({ history, documents: documentList, name: session.user.name });

    return new Response(result, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Chat failed" }, { status: 500 });
  }
};