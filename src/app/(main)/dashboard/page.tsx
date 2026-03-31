
import { Logo } from '@/components/icons/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Bot } from 'lucide-react'
import DocumentTable from "@/components/documents/document-table"
import prisma from '@/lib/prisma'
import { auth } from '@/services/auth/auth'


export default async function DashboardPage() {
    const session = await auth();
    const userId = session?.user.id
    const data = await prisma.document.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            name: true,
            chunkCount: true,
            createdAt: true,
        },
    })

    const tableData = data.map((doc) => ({
        ...doc,
        createdAt: doc.createdAt.toISOString(),
    }))

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
                <div className='inline-flex  items-center gap-2'>
                    <Button variant={"outline"}>upload</Button>
                    <Button variant={"destructive"}>logout</Button>
                </div>
            </nav>
            {/* ai section  */}
            <div className=' min-h-90 bg-primary/75 rounded-2xl max-w-5xl mx-auto mb-10'>
                <div className='flex max-w-4xl mx-auto flex-col justify-center items-center'>

                    <Bot size={100} />
                    <h3 className=' py-10  text-xl  text-shadow-2xs '>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus provident nisi repellendus neque nemo suscipit quia quas ratione dolores autem? Perferendis adipisci atque non eos, totam sint quidem odio dolores.
                    </h3>
                </div>
            </div>
            {/* ---------------- */}
            {/*  recent documents  */}
            <DocumentTable documents={tableData} />
        </div>
    )
}
