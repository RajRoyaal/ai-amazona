"use client"

import { UploadButton as UTUploadButton } from "@uploadthing/react"
import { OurFileRouter } from "../../../lib/uploadthing/config"

interface UploadButtonProps {
  endpoint: keyof OurFileRouter
  onUploadComplete?: (urls: string[]) => void
  onUploadError?: (error: Error) => void
}

export function UploadButton({
  endpoint,
  onUploadComplete,
  onUploadError,
}: UploadButtonProps) {
  return (
    <UTUploadButton<OurFileRouter, keyof OurFileRouter>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const urls = res?.map((r) => r.url) ?? []
        onUploadComplete?.(urls)
      }}
      onUploadError={(error: Error) => {
        onUploadError?.(error)
      }}
    />
  )
} 