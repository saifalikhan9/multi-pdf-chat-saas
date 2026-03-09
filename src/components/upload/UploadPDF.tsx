"use client"

import { useState } from "react"
import { Upload, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const MAX_FILE_SIZE = 10 * 1024 * 1024 

export default function UploadPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("")
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.")
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File must be smaller than 10MB.")
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(10)
    setError("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error(data.error || "Unauthorized")
        }

        if (res.status === 400) {
          throw new Error(data.error || "No file provided")
        }

        throw new Error(data.error || "Upload failed")
      }

      setProgress(100)

      const { documentId, chunkCount } = data

      toast.success(
        `Uploaded ${file.name} – ${chunkCount} chunks created`
      )

      setFile(null)

      
      router.push(`/chat/new?docId=${documentId}`)
    } catch (err: any) {
      console.error(err)
      setError(err.message)
      toast.error(err.message)
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-6 space-y-6">

        {/* Upload Area */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-10 cursor-pointer hover:bg-muted transition">
          <Upload className="mb-4 text-muted-foreground" size={32} />
          <p className="text-sm text-muted-foreground">
            Click to upload a PDF
          </p>

          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* File Preview */}
        {file && (
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <FileText size={20} />
            <span className="text-sm flex-1">{file.name}</span>
            <span className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Upload Progress */}
        {uploading && (
          <Progress value={progress} />
        )}

        {/* Upload Button */}
        <Button
          disabled={!file || uploading}
          onClick={handleUpload}
          className="w-full"
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </Button>

      </CardContent>
    </Card>
  )
}