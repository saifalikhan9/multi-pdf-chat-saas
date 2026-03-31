import prisma from "@/lib/prisma";
import { auth } from "@/services/auth/auth";
import { minstral } from "@/services/llms/minstral";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
  
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
  
      const promptTemplate = PromptTemplate.fromTemplate(`
  You are an AI assistant for a PDF chat app.
  
  Here is the user's recent activity:
  {history}
  
  Write a short, friendly 1–2 sentence greeting:
  - Welcome them back
  - Briefly summarize what they were working on
  - Ask if they want to continue or try something new
  
  Keep it natural and conversational.
  `);
  
      const chain = promptTemplate
        .pipe(minstral)
        .pipe(new StringOutputParser());
  
      // ✅ NO STREAM
      const result = await chain.invoke({ history });
  
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