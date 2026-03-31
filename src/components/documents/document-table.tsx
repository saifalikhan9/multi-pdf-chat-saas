"use client"

import React, { useState, useMemo } from 'react'
import { Card } from '../ui/card'
import { Eye, FileText, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

interface TableDataTypes {
    id: string,
    name: string,
    chunkCount: number,
    createdAt: string
}

interface DocumentTableProps {
    documents: TableDataTypes[]
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents }) => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [deleting, setDeleting] = useState<string | null>(null)
    // This is client-only: parent server component fetches & passes documents

    const filteredDocuments = useMemo(
        () =>
            documents.filter(doc =>
                doc.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [documents, searchQuery]
    )

    // Placeholder: implement actual delete logic here when backend is ready
    function handleDeleteDocument(id: string) {
        setDeleting(id)
        // In real usage, call your backend delete API and refresh state by re-fetching from server
        setTimeout(() => {
            setDeleting(null)
            // Optionally show a toast or refetch after delete
        }, 600)
    }

    return (
        <Card className="bg-card shadow shadow-primary/50">
            <div className="overflow-x-auto">

                <div className="max-w-sm mb-4 ml-4">
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded border border-border bg-card text-foreground"
                    />
                </div>

                <table className="w-full">

                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left p-4 font-semibold text-muted-foreground">
                                Name
                            </th>
                            <th className="text-left p-4 font-semibold text-muted-foreground">
                                Chunks
                            </th>
                            <th className="text-left p-4 font-semibold text-muted-foreground">
                                Uploaded
                            </th>
                            <th className="text-right p-4 font-semibold text-muted-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredDocuments.map(doc => (
                            <tr
                                key={doc.id}
                                className="border-b border-border hover:bg-background"
                            >
                                {/* Name */}
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-accent shrink-0" />
                                        <span className="font-medium text-foreground truncate">
                                            {doc.name}
                                        </span>
                                    </div>
                                </td>

                                {/* Chunks */}
                                <td className="p-4 text-muted-foreground">
                                    {doc.chunkCount}
                                </td>

                                {/* Uploaded */}
                                <td className="p-4 text-muted-foreground">
                                    {new Date(doc.createdAt).toLocaleDateString()}
                                </td>

                                {/* Actions */}
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/chat/${doc.id}`}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                title="Chat with document"
                                            >
                                                <Eye size={16} />
                                            </Button>
                                        </Link>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={deleting === doc.id}
                                            onClick={() => handleDeleteDocument(doc.id)}
                                            className="text-destructive"
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

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                        {searchQuery
                            ? "No documents found"
                            : "No documents uploaded yet"}
                    </p>
                </div>
            )}
        </Card>
    )
}

export default DocumentTable