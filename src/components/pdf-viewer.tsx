"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// This is required to set up the PDF.js worker so it runs in the background
// without freezing your main UI thread.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Optional: Hide the default text/annotation layers if you just want a clean visual render
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col h-full w-full items-center bg-zinc-100/50">
      
      {/* 1. The Pagination Controls (Sticky Top) */}
      <div className="flex items-center justify-between w-full bg-white border-b border-gray-200 px-4 py-2 shadow-sm z-10">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <p className="text-sm font-medium text-gray-600">
          Page {pageNumber} of {numPages || "..."}
        </p>
        
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* 2. The PDF Document Render Area */}
      <div className="flex-1 overflow-y-auto w-full flex justify-center p-4">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-blue-600" />
              <p>Loading document...</p>
            </div>
          }
          className="shadow-lg rounded-md overflow-hidden"
        >
          {/* We ONLY render the current page, which makes it lightning fast */}
          <Page 
            pageNumber={pageNumber} 
            width={500} // You can adjust this width based on your container
            renderTextLayer={false} 
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

    </div>
  );
}