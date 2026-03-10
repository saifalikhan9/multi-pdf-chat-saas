import DocumentsTable from "@/components/documents/document-table"
import prisma from "@/lib/prisma"
import { auth } from "@/services/auth/auth"


export default async function Page() {

  const session = await auth()

  if (!session?.user?.id) {
    return <div>Unauthorized</div>
  }

  const documents = await prisma.document.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <DocumentsTable documents={documents} />
  )
}