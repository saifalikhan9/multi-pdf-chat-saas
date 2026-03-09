'use client'

import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Document {
  id: string
  name: string
  pages: number
  currentPage: number
}

interface DocumentPanelProps {
  documents: Document[]
  onClose?: () => void
  onPageChange?: (docId: string, page: number) => void
}

export function DocumentPanel({
  documents,
  onClose,
  onPageChange,
}: DocumentPanelProps) {
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(
    new Set(documents.map((d) => d.id))
  )

  const toggleDoc = (docId: string) => {
    const newExpanded = new Set(expandedDocs)
    if (newExpanded.has(docId)) {
      newExpanded.delete(docId)
    } else {
      newExpanded.add(docId)
    }
    setExpandedDocs(newExpanded)
  }

  return (
    <Card className="bg-card border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Documents</h3>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No documents selected
              </p>
            </div>
          ) : (
            documents.map((doc) => (
              <div key={doc.id} className="space-y-2">
                {/* Document Header */}
                <button
                  onClick={() => toggleDoc(doc.id)}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-background transition-colors text-left"
                >
                  <FileText size={16} className="text-accent flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doc.pages} pages
                    </p>
                  </div>
                  {expandedDocs.has(doc.id) ? (
                    <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {/* Page Navigation */}
                {expandedDocs.has(doc.id) && (
                  <div className="pl-8 space-y-1">
                    <div className="flex gap-2 mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => onPageChange?.(doc.id, Math.max(1, doc.currentPage - 1))}
                        disabled={doc.currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => onPageChange?.(doc.id, Math.min(doc.pages, doc.currentPage + 1))}
                        disabled={doc.currentPage === doc.pages}
                      >
                        Next
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Page {doc.currentPage} of {doc.pages}
                    </p>
                    <div className="grid grid-cols-2 gap-1 pt-2 max-h-32 overflow-y-auto">
                      {Array.from({ length: doc.pages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => onPageChange?.(doc.id, page)}
                          className={cn(
                            'p-1 text-xs rounded border transition-colors',
                            doc.currentPage === page
                              ? 'bg-accent text-accent-foreground border-accent'
                              : 'border-border text-muted-foreground hover:border-accent'
                          )}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  )
}
