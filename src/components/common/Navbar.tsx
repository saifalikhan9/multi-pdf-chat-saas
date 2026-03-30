"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { useSession, signIn } from "next-auth/react"
import { Logo } from "../icons/logo"
import { motion } from "motion/react"
import { useState } from "react"



export const Navbar = () => {
  const { data: session } = useSession()
  const navLinks = [
    {
      name: "Features",
      link: "/features"
    },
    {
      name: "How it Works",
      link: "/how-it-works"
    },
    {
      name: "GitHub",
      link: "/github"
    }
  ]

  const [hovered, setHovered] = useState<number | null>(null)

  return (
    // <header className="border-b border-border">
    //   <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
    //     <div className="font-bold text-2xl text-foreground">
    //       PDFChat AI
    //     </div>

    //     <div className="flex gap-4">

    //       {!session && (
    //         <Button onClick={() => signIn("google")}>
    //           Login
    //         </Button>
    //       )}

    //       {session && (
    //         <>
    //           <Link href="/dashboard">
    //             <Button variant="outline">
    //               Dashboard
    //             </Button>
    //           </Link>

    //           <Link href="/chat/new">
    //             <Button>
    //               Start Chatting
    //             </Button>
    //           </Link>
    //         </>
    //       )}

    //     </div>
    //   </div>
    // </header>
    <nav >
      <div className="flex justify-between px-4 py-2 ">

        <div className="inline-flex  items-center gap-2">
          <Logo />
          <span className="text-xl">
            iDoc-AI
          </span>
        </div>
        <motion.div className="inline-flex items-center justify-between  text-sm text-neutral-500 relative">
          {navLinks.map((e, i) => (
            <div
              key={e.link}
              className="relative py-1 font-bold tracking-wide"
              onMouseLeave={() => setHovered(null)}
              onMouseEnter={() => setHovered(i)}
            >
              <Link
                href={e.link}
                className="relative z-10 px-3   hover:text-white "
              >
                {e.name}
              </Link>
              {hovered === i && (
                <motion.div

                  layoutId="nav-hover"
                  className="absolute inset-0 bg-white/20 shadow-custom-inset-shadow-dark rounded-2xl z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}

                />
              )}
            </div>
          ))}
        </motion.div>
        <div>
          <Link href={session && "/dashboard" || "/"}>
            <Button onClick={() => {
              if (!session) signIn("google")

            }} className="">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-primary-foreground w-full h-px mask-l-from-1% mask-r-from-1% my-1" />
    </nav>
  )
}