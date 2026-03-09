'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FileText, Trash2, Share2, Eye, Upload, Search } from 'lucide-react'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UploadPDF from "@/components/upload/UploadPDF"

export default function DocumentsPage() {
    const [searchQuery, setSearchQuery] = useState('')

    // Mock data
    const documents = [
        {
            id: 1,
            name: 'Q3 Financial Report.pdf',
            size: '2.4 MB',
            uploaded: '2 days ago',
            pages: 45,
            chats: 5,
        },
        {
            id: 2,
            name: 'Research Paper on AI.pdf',
            size: '3.1 MB',
            uploaded: '5 days ago',
            pages: 28,
            chats: 8,
        },
        {
            id: 3,
            name: 'Marketing Strategy 2024.pdf',
            size: '1.8 MB',
            uploaded: '1 week ago',
            pages: 32,
            chats: 3,
        },
        {
            id: 4,
            name: 'Annual Report 2023.pdf',
            size: '5.2 MB',
            uploaded: '2 weeks ago',
            pages: 67,
            chats: 12,
        },
        {
            id: 5,
            name: 'Technical Specification.pdf',
            size: '0.9 MB',
            uploaded: '1 month ago',
            pages: 15,
            chats: 2,
        },
    ]

    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (

        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Documents</h1>
                    <p className="text-muted-foreground mt-2">Manage your uploaded PDF documents</p>
                </div>
                <Dialog>
                    <DialogTrigger >
                        <Button className="gap-2">
                            <Upload size={18} />
                            Upload PDF
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Upload PDF</DialogTitle>
                        </DialogHeader>

                        <UploadPDF />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-border text-foreground"
                />
            </div>

            {/* Documents Table */}
            <Card className="bg-card border-border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left p-4 font-semibold text-muted-foreground">Name</th>
                                <th className="text-left p-4 font-semibold text-muted-foreground">Size</th>
                                <th className="text-left p-4 font-semibold text-muted-foreground">Pages</th>
                                <th className="text-left p-4 font-semibold text-muted-foreground">Chats</th>
                                <th className="text-left p-4 font-semibold text-muted-foreground">Uploaded</th>
                                <th className="text-right p-4 font-semibold text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocuments.map((doc) => (
                                <tr key={doc.id} className="border-b border-border hover:bg-background transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-accent shrink-0" />
                                            <span className="font-medium text-foreground truncate">{doc.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground">{doc.size}</td>
                                    <td className="p-4 text-muted-foreground">{doc.pages}</td>
                                    <td className="p-4 text-muted-foreground">{doc.chats}</td>
                                    <td className="p-4 text-muted-foreground">{doc.uploaded}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/chat/new?docId=${doc.id}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-accent hover:bg-accent hover:text-accent-foreground"
                                                    title="Start chat with this document"
                                                >
                                                    <Eye size={16} />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground hover:bg-muted"
                                                title="Share document"
                                            >
                                                <Share2 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                title="Delete document"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredDocuments.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                            {searchQuery ? 'No documents found' : 'No documents uploaded yet'}
                        </p>
                    </div>
                )}
            </Card>
        </div>

    )
}
