"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { useSession, signIn } from "next-auth/react"

export const Navbar = () => {
  const { data: session } = useSession()

  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="font-bold text-2xl text-foreground">
          PDFChat AI
        </div>

        <div className="flex gap-4">

          {!session && (
            <Button onClick={() => signIn("google")}>
              Login
            </Button>
          )}

          {session && (
            <>
              <Link href="/dashboard">
                <Button variant="outline">
                  Dashboard
                </Button>
              </Link>

              <Link href="/chat/new">
                <Button>
                  Start Chatting
                </Button>
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  )
}