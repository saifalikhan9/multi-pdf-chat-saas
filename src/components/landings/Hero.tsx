import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

export const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-24 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6 tracking-tight">
                Chat with Your PDFs
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Upload your PDFs and get instant answers powered by advanced AI. Extract insights, ask questions, and get citations for every answer.
            </p>
            <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight size={20} />
                </Button>
            </Link>
        </section>
    )
}
