import PdfViewer from "@/components/pdf-viewer";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
// import ChatInterface from "./ChatInterface"; // We will build this next!

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  // 1. Fetch the document securely from the database
  const document = await prisma.document.findUnique({
    where: {
      id: id,
    },
  });

  // 2. If the document doesn't exist (or was deleted), show a 404
  if (!document) {
    notFound();
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      
      {/* LEFT PANE: The PDF Viewer */}
      <div className="flex-1 border-r border-gray-200 bg-zinc-800/10">
        <div className="flex h-14 items-center border-b border-gray-200 bg-white px-4">
          <h1 className="font-semibold text-gray-800 truncate">
            {document.name}
          </h1>
        </div>
        
        {/* The iframe renders the UploadThing URL perfectly */}
        <div className="h-[calc(100vh-3.5rem)] w-full">
        <PdfViewer url={document.fileUrl} />
        </div>
      </div>

      {/* RIGHT PANE: The Chat Interface */}
      <div className="w-[450px] lg:w-[600px] flex flex-col bg-white">
        <div className="flex h-14 items-center border-b border-gray-200 px-4">
          <h2 className="font-semibold text-gray-800">Chat</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4">
          {/* We will drop your Chat Client Component here later */}
          <p className="text-gray-500">Chat interface goes here...</p>
        </div>
      </div>

    </div>
  );
}