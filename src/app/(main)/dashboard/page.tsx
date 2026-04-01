
import { Logo } from '@/components/icons/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Bot } from 'lucide-react'
import DocumentTable from "@/components/documents/document-table"
import prisma from '@/lib/prisma'
import { auth } from '@/services/auth/auth'
import { CTAButtons } from './CTA-Buttons'
import { cookies } from 'next/headers';
import ReactMarkdown from "react-markdown"




export default async function DashboardPage() {
    const session = await auth();
    const userId = session?.user.id;
    
    const cookieStore = await cookies();
    
    const [data, greetRes] = await Promise.all([
      prisma.document.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          chunkCount: true,
          createdAt: true,
        },
      }),
      fetch("http://localhost:3000/api/greet", {
        headers: {
          cookie: cookieStore.toString(),
        },
      }),
    ]);
    
    const tableData = data.map((doc) => ({
      ...doc,
      createdAt: doc.createdAt.toISOString(),
    }));
    
    const greetData = await greetRes.text();



    return (
        <div className='space-y-8 '>
            <nav className={cn('flex justify-between items-center relative  p-1',
                "after:content-[''] after:absolute after:w-full after:h-px after:mask-l-from-5 after:mask-r-from-5 after:inset-x-0 after:bg-white after:-bottom-2"
            )}>
                <div className="inline-flex  items-center gap-2">
                    <Logo />
                    <span className="text-xl ">
                        iDoc-AI
                    </span>
                </div>
                <CTAButtons />
            </nav>
            {/* ai section  */}
            <div className=' min-h-90 bg-primary/75 rounded-2xl max-w-5xl mx-auto mb-10'>
                <div className='flex max-w-4xl mx-auto flex-col justify-center items-center'>

                    <Bot size={100} />

                    <article className="prose prose-invert prose-xl ">
                        <ReactMarkdown >{greetData}</ReactMarkdown>
                    </article>
                </div>
            </div>
            {/* ---------------- */}
            {/*  recent documents  */}
            <DocumentTable documents={tableData} />
        </div>
    )
}
