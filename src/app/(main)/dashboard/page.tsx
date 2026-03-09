'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Upload, FileText, MessageSquare, Plus, Zap } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    // Mock data
    const stats = [
        { title: 'PDFs Uploaded', value: '12', icon: FileText, color: 'text-blue-500' },
        { title: 'Chats Created', value: '47', icon: MessageSquare, color: 'text-purple-500' },
        { title: 'Tokens Used', value: '15.2K', icon: Zap, color: 'text-orange-500' },
    ]

    const recentDocuments = [
        { id: 1, name: 'Q3 Financial Report.pdf', size: '2.4 MB', uploaded: '2 days ago' },
        { id: 2, name: 'Research Paper on AI.pdf', size: '3.1 MB', uploaded: '5 days ago' },
        { id: 3, name: 'Marketing Strategy 2024.pdf', size: '1.8 MB', uploaded: '1 week ago' },
    ]

    const recentChats = [
        { id: 1, title: 'Q3 Financial Analysis', messages: 12, lastActive: '2 hours ago' },
        { id: 2, title: 'AI Research Discussion', messages: 8, lastActive: '1 day ago' },
        { id: 3, title: 'Marketing Strategy Review', messages: 15, lastActive: '3 days ago' },
    ]

    return (

        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Welcome back! Here's your activity overview.</p>
                </div>
                <Link href="/documents">
                    <Button className="gap-2">
                        <Upload size={18} />
                        Upload PDF
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title} className="bg-card border-border">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Icon className={`w-4 h-4 ${stat.color}`} />
                                    {stat.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Recent Documents and Chats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Documents */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-foreground">Recent Documents</CardTitle>
                        <CardDescription>Your recently uploaded PDFs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentDocuments.map((doc) => (
                                <div key={doc.id} className="flex items-start justify-between p-3 rounded-lg bg-background hover:bg-muted transition-colors cursor-pointer">
                                    <div className="flex items-start gap-3 flex-1">
                                        <FileText className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-foreground truncate">{doc.name}</p>
                                            <p className="text-sm text-muted-foreground">{doc.size} • {doc.uploaded}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/documents" className="block mt-4">
                            <Button variant="outline" className="w-full">
                                View All Documents
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Recent Chats */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-foreground">Recent Chats</CardTitle>
                        <CardDescription>Your recent conversations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentChats.map((chat) => (
                                <Link key={chat.id} href={`/chat/${chat.id}`}>
                                    <div className="flex items-start justify-between p-3 rounded-lg bg-background hover:bg-muted transition-colors cursor-pointer">
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground">{chat.title}</p>
                                            <p className="text-sm text-muted-foreground">{chat.messages} messages • {chat.lastActive}</p>
                                        </div>
                                        <MessageSquare className="w-5 h-5 text-accent shrink-0" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Link href="/chat/new" className="block mt-4">
                            <Button variant="outline" className="w-full gap-2">
                                <Plus size={16} />
                                Start New Chat
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Start */}
            <Card className="bg-linear-to-r from-accent/10 to-primary/10 border-accent/20">
                <CardHeader>
                    <CardTitle className="text-foreground">Quick Start</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-muted-foreground">
                            New to PDFChat AI? Follow these steps to get the most out of the platform:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>Upload your first PDF document</li>
                            <li>Create a new chat session</li>
                            <li>Ask questions about your document</li>
                            <li>Get answers with citations and references</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}
