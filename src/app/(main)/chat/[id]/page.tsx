'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '@/components/chat/message'
import { ChatInput } from '@/components/chat/input'
import { DocumentPanel } from '@/components/chat/document-panel'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    citations?: Array<{
        source: string
        page: number
        text: string
    }>
}

interface Document {
    id: string
    name: string
    pages: number
    currentPage: number
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I\'m here to help you understand your documents. Upload a PDF or ask me a question about any document you\'ve already loaded.',
            timestamp: new Date(),
        },
    ])

    const [documents, setDocuments] = useState<Document[]>([
        { id: 'doc1', name: 'Sample Document.pdf', pages: 45, currentPage: 1 },
        { id: 'doc2', name: 'Research Paper.pdf', pages: 28, currentPage: 1 },
    ])

    const [isLoading, setIsLoading] = useState(false)
    const [showDocPanel, setShowDocPanel] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = (message: string) => {
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: message,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setIsLoading(true)

        // Simulate API response
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content:
                    'Based on the documents you\'ve provided, I can see that this is a relevant answer. The information suggests that you should consider multiple factors when making decisions. This approach aligns with best practices in the industry.',
                timestamp: new Date(),
                citations: [
                    {
                        source: 'Sample Document.pdf',
                        page: 12,
                        text: '...when making informed decisions, consider all available data sources...',
                    },
                    {
                        source: 'Research Paper.pdf',
                        page: 5,
                        text: '...best practices recommend a comprehensive approach...',
                    },
                ],
            }

            setMessages((prev) => [...prev, assistantMessage])
            setIsLoading(false)
        }, 1500)
    }

    const handlePageChange = (docId: string, page: number) => {
        setDocuments((prev) =>
            prev.map((doc) =>
                doc.id === docId ? { ...doc, currentPage: page } : doc
            )
        )
    }

    return (
        <main className="flex-1 w-full min-h-screen flex md:ml-0">
            {/* Chat Messages */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="border-b border-border bg-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon">
                                <ChevronLeft size={20} />
                            </Button>
                        </Link>
                        <h1 className="text-lg font-semibold text-foreground">New Chat</h1>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreVertical size={20} />
                    </Button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-3xl mx-auto space-y-4">
                        {messages.map((msg) => (
                            <ChatMessage
                                key={msg.id}
                                role={msg.role}
                                content={msg.content}
                                citations={msg.citations}
                                timestamp={msg.timestamp}
                            />
                        ))}

                        {isLoading && (
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                </div>
                                <div className="flex-1 max-w-xl">
                                    <div className="inline-block px-4 py-3 rounded-lg bg-card border border-border rounded-bl-none">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-border bg-card p-4 md:p-8">
                    <div className="max-w-3xl mx-auto">
                        <ChatInput
                            onSend={handleSendMessage}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>

            {/* Document Panel - Sidebar on Desktop */}
            {showDocPanel && (
                <>
                    {/* Desktop Panel */}
                    <div className="hidden lg:block w-80 border-l border-border bg-background p-4">
                        <DocumentPanel
                            documents={documents}
                            onPageChange={handlePageChange}
                            onClose={() => setShowDocPanel(false)}
                        />
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="lg:hidden absolute bottom-20 right-4">
                        <Button
                            onClick={() => setShowDocPanel(!showDocPanel)}
                            variant="outline"
                            size="icon"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                    </div>
                </>
            )}
        </main>
    )
}
