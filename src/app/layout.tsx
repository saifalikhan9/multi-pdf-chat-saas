import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import { auth } from '@/services/auth/auth'
import { Corinthia } from 'next/font/google'

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from '@/services/uploadthing/core'

const corinthia = Corinthia({

  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-corinthia",
})

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
      <body className={`${corinthia.variable} antialiased`}>
      <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
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
