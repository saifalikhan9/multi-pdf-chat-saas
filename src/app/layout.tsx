import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import { auth } from '@/services/auth/auth'



export const metadata: Metadata = {
  title: 'Multi-PDF Chat AI',
  description: 'Chat with your PDFs using AI. Upload documents and get intelligent answers.',

}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider session={session}>

            {children}
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </ThemeProvider>

      </body>
    </html>
  )
}
