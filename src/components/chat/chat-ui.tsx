"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import ChatHistory, { Message } from "./chat-history"





export default function ChatUI({ docId, initMessage }: { docId: string, initMessage: Message[] }) {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<Message[]>(initMessage || [])
  const [loading, setLoading] = useState(false)

  async function askQuestion() {
    if (!question.trim()) {
      toast.error("Invalid question")
      return
    }

    const userMessage: Message = {
      role: "user",
      content: question
    }

    setMessages(prev => [...prev, userMessage])
    setQuestion("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question,
          docId
        })
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error(data.error || "Unauthorized")
        }

        if (res.status === 400) {
          throw new Error(data.error || "Invalid question")
        }

        throw new Error(data.error || "Chat failed")
      }

      let answerText = ""

      if (typeof data.answer === "string") {
        answerText = data.answer
      } else {
        answerText = JSON.stringify(data.answer, null, 2)
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: answerText,
        citations: data.citations || []
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    askQuestion()
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">

      {/* Chat History */}
      <ChatHistory messages={messages} loading={loading} />

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-border pt-4"
      >
        <Input
          placeholder="Ask a question about this document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Button disabled={loading}>
          Ask
        </Button>
      </form>

    </div>
  )
}