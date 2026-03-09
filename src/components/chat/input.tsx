'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Paperclip, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  isLoading?: boolean
}

export function ChatInput({ onSend, disabled, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim() && !disabled && !isLoading) {
      onSend(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSend()
    }
  }

  return (
    <div className="space-y-3">
      {/* Input Area */}
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your PDFs... (Ctrl+Enter to send)"
            className="bg-card border-border text-foreground resize-none"
            disabled={disabled || isLoading}
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled || isLoading}
            className={cn(
              'gap-2',
              isLoading && 'opacity-70'
            )}
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin" />
                <span className="hidden sm:inline">Sending</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={disabled || isLoading}
            title="Attach file"
          >
            <Paperclip size={18} />
          </Button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground">Suggestions:</span>
        <button className="text-xs px-2 py-1 rounded bg-card border border-border text-muted-foreground hover:border-accent hover:text-foreground transition-colors">
          Summarize
        </button>
        <button className="text-xs px-2 py-1 rounded bg-card border border-border text-muted-foreground hover:border-accent hover:text-foreground transition-colors">
          Key points
        </button>
        <button className="text-xs px-2 py-1 rounded bg-card border border-border text-muted-foreground hover:border-accent hover:text-foreground transition-colors">
          Compare
        </button>
      </div>
    </div>
  )
}
