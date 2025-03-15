"use client"

import { UploadDropzone as UTUploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "../../../lib/uploadthing/config"

interface UploadDropzoneProps {
  endpoint: keyof OurFileRouter
  onUploadComplete?: (urls: string[]) => void
  onUploadError?: (error: Error) => void
}

export function UploadDropzone({
  endpoint,
  onUploadComplete,
  onUploadError,
}: UploadDropzoneProps) {
  return (
    <UTUploadDropzone<OurFileRouter, keyof OurFileRouter>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const urls = res?.map((r) => r.url) ?? []
        onUploadComplete?.(urls)
      }}
      onUploadError={(error: Error) => {
        onUploadError?.(error)
      }}
      className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
    />
  )
} 