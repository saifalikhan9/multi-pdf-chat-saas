import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'



export const metadata: Metadata = {
  title: 'Multi-PDF Chat AI',
  description: 'Chat with your PDFs using AI. Upload documents and get intelligent answers.',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>

      </body>
    </html>
  )
}
