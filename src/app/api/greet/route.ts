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
        const lastMessage = await prisma.chat.findFirst({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: { document: true }
        });

        if (!lastMessage) {
            return new Response(
                "Welcome! Upload your first PDF to start chatting and extracting insights.",
                {
                    status: 200,
                    headers: { "Content-Type": "text/plain; charset=utf-8" }
                }
            );
        }
        // here we get all the docs from the specific user and then we get get the chunks and build the context and feed that to the llm

        const promptTemplate = PromptTemplate.fromTemplate(`
            You are the AI assistant for a PDF chat application. The user just logged into their dashboard.
            
            Here is the context of their last interaction:
            - Document they were reading: {docName}
            - Their last question: "{question}"
            - Your last answer: "{answer}"
            
            Write a short, friendly, one-to-two sentence greeting. Welcome them back, briefly mention what you were last discussing, and ask if they want to continue with that document or explore something new. 
            Keep it conversational and helpful. Do not use quotes around your greeting.
          `);
        const chain = promptTemplate.pipe(minstral).pipe((new StringOutputParser()));


        const stream = await chain.stream({
            docName: lastMessage.document.name,
            question: lastMessage.question,
            answer: lastMessage.answer,
        });

        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {

                for await (const chunk of stream) {
                    controller.enqueue(
                        encoder.encode(chunk)
                    );
                }

                controller.close();
            },
        });

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache, no-transform",
            },
        });

    } catch (error) {
        console.error("Chat API error:", error);
        return Response.json({ error: "Chat failed" }, { status: 500 });
    }
}