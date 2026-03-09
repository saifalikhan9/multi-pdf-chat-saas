import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
export const CTA = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="bg-card border border-border rounded-lg p-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                    Ready to get started?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Join thousands of users who are already using PDFChat AI to extract insights from their documents.
                </p>
                <Link href="/dashboard">
                    <Button size="lg">
                        Start Free
                    </Button>
                </Link>
            </div>
        </section>
    )
}
