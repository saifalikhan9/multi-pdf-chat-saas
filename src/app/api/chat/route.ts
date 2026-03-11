import { auth } from "@/services/auth/auth";
import { buildContext } from "@/services/rag/context";
import { generateAnswer } from "@/services/rag/generate";
import { retrieveChunks } from "@/services/rag/retrive";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const { question, docId } = await req.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Invalid question" }, { status: 400 });
    }

    const docs = await retrieveChunks(question, userId, docId);

    const context = buildContext(docs);

    const stream = await generateAnswer(question, context);

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
      },
    });

  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json({ error: "Chat failed" }, { status: 500 });
  }
}