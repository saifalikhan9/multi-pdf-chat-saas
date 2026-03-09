import { User, Bot, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Citation {
  source: string
  page: number
  text: string
}

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  citations?: Citation[]
  timestamp?: Date
}

export function ChatMessage({ role, content, citations, timestamp }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = role === 'user'

  return (
    <div className={cn(
      'flex gap-4 mb-6 animate-in fade-in duration-300',
      isUser && 'flex-row-reverse'
    )}>
      {/* Avatar */}
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        isUser ? 'bg-accent' : 'bg-card border border-border'
      )}>
        {isUser ? (
          <User size={16} className="text-accent-foreground" />
        ) : (
          <Bot size={16} className="text-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        'flex-1 max-w-xl',
        isUser && 'text-right'
      )}>
        {/* Message Bubble */}
        <div className={cn(
          'inline-block px-4 py-3 rounded-lg mb-2 break-words',
          isUser
            ? 'bg-accent text-accent-foreground rounded-br-none'
            : 'bg-card border border-border text-foreground rounded-bl-none'
        )}>
          <p className="text-sm leading-relaxed">{content}</p>
        </div>

        {/* Citations */}
        {citations && citations.length > 0 && (
          <div className={cn(
            'mt-3 space-y-2',
            isUser && 'text-left flex justify-end'
          )}>
            <p className="text-xs text-muted-foreground font-semibold">
              Sources:
            </p>
            {citations.map((citation, idx) => (
              <div
                key={idx}
                className="text-xs bg-card border border-border rounded p-2 text-muted-foreground hover:border-accent transition-colors cursor-pointer"
              >
                <div className="font-medium text-foreground mb-1">
                  {citation.source} • Page {citation.page}
                </div>
                <p className="italic">{citation.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Timestamp & Actions */}
        <div className={cn(
          'flex items-center gap-2 mt-2 text-xs text-muted-foreground',
          isUser && 'justify-end'
        )}>
          {timestamp && <span>{timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
          {!isUser && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="text-muted-foreground hover:text-foreground p-0 h-auto"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
