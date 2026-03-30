"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useSession, signIn } from "next-auth/react"
import { Arrows } from "../icons/Arrows"
import { cn } from "@/lib/utils"

export const Hero = () => {
  // const { data: session } = useSession()

  return (
    <section className="max-w-7xl mx-auto px-4 py-24 text-center">
      <div className=" inline-flex items-baseline gap-2 w-fit px-2 mx-auto mb-10 bg-primary/20 rounded-2xl  py-1  ring-[0.8px] ring-primary/40">
< span className="size-2 rounded-full inset-0 top-2 left-2 ring ring-primary/50  bg-primary animate-pulse "/>
        <p className="uppercase text-xs tracking-wider font-semibold text-primary">AI second brain for Documents</p>
      </div>
      <div className="text-7xl  font-bold text-foreground mb-6    ">
        Your  Second <span className="font-lavish">
          Brain </span>   <br />
        <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-[#22D3EE]  ">for Documents</span>
      </div>

      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Upload your PDFs and get instant answers powered by advanced AI.
        Extract insights, ask questions, and get citations for every answer.
      </p>


      <div className="inline-flex gap-2 ">
        <Button className={"p-5"} size={"lg"}>Try iDoc-AI
          <ArrowRight />
        </Button>
        <Button variant={"outline"} size={"lg"} className=" p-5"><Arrows />View on GitHub
        </Button>
      </div>

    </section>
  )
}