"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileText, Trash2, Eye, Search, Upload } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UploadPDF from "@/components/upload/UploadPDF"
import Link from "next/link"
import { toast } from "sonner"

type Document = {
    id: string
    name: string
    chunkCount: number
    createdAt: string
}

export default function DocumentsTable({
    documents
}: {
    documents: Document[]
}) {

    const [searchQuery, setSearchQuery] = useState("")
    const [docs, setDocs] = useState(documents)
    const [deleting, setDeleting] = useState<string | null>(null)

    const filteredDocuments = docs.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    async function deleteDocument(id: string) {
        try {
            setDeleting(id)

            const res = await fetch(`/api/documents/${id}`, {
                method: "DELETE"
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Delete failed")
            }

            setDocs(prev => prev.filter(doc => doc.id !== id))

            toast.success("Document deleted")

        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setDeleting(null)
        }
    }

    return (
        <div className="space-y-6">

            {/* Search */}
            <div className="flex justify-between ">

                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-card border-border"
                    />
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

            {/* Table */}
            <Card className="bg-card border-border">
                <div className="overflow-x-auto">

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
                                                onClick={() => deleteDocument(doc.id)}
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

        </div>
    )
}