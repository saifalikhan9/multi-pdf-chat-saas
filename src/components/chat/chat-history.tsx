"use client"
import ReactMarkdown from "react-markdown"
export type Citation = {
  doc: string
  chunk: number
  docId: string
}

export type Message = {
  role: "user" | "assistant"
  content: string
  citations?: Citation[]
}

export default function ChatHistory({
  messages,
  loading
}: {
  messages: Message[]
  loading: boolean
}) {
  return (
    <div className="flex-1 overflow-y-auto space-y-6 py-6">

      {messages.map((msg, i) => (
        <div key={i}>

          <div
            className={`p-4 rounded-lg max-w-xl ${msg.role === "user"
              ? "ml-auto bg-primary text-primary-foreground"
              : "bg-muted"
              }`}
          >
            <ReactMarkdown >
              {msg.content}
            </ReactMarkdown>
          </div>

          {/* Citations */}
          {msg.role === "assistant" &&
            msg.citations &&
            msg.citations.length > 0 && (
              <div className="mt-2 text-sm text-muted-foreground space-y-1">

                {msg.citations.map((c, idx) => (
                  <div key={idx}>
                    From {c.doc} (chunk #{c.chunk})
                  </div>
                ))}

              </div>
            )}

        </div>
      ))}

      {loading && (
        <div className="text-sm text-muted-foreground">
          AI is thinking...
        </div>
      )}

    </div>
  )
}