import { MessageSquare, Upload, Zap } from 'lucide-react'
import React from 'react'

export const Feature = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
      Powerful Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="bg-card rounded-lg p-8 border border-border">
        <Upload className="w-12 h-12 text-accent mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Easy Upload
        </h3>
        <p className="text-muted-foreground">
          Upload multiple PDFs at once and start asking questions immediately. Support for documents up to 50MB.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-card rounded-lg p-8 border border-border">
        <MessageSquare className="w-12 h-12 text-accent mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Intelligent Chat
        </h3>
        <p className="text-muted-foreground">
          Ask natural language questions and get accurate answers with citations showing exactly where the information came from.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-card rounded-lg p-8 border border-border">
        <Zap className="w-12 h-12 text-accent mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Lightning Fast
        </h3>
        <p className="text-muted-foreground">
          Powered by cutting-edge AI models for instant, accurate responses to your questions.
        </p>
      </div>
    </div>
  </section>
  )
}
