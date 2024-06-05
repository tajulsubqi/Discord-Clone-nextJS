"use client"
import { UploadDropzone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"
import { X } from "lucide-react"
import Image from "next/image"

interface FileUploadProps {
  onChange: (value: string) => void
  value: string
  endpoint: "messageFile" | "serverImage"
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop()

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
          fill
          objectFit="cover"
        />
        <button
          className="absolute top-0 right-0 bg-rose-500 text-white p-1 shadow-sm"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => onChange(res?.[0]?.url)}
        onUploadError={(error: Error) => console.error("Upload Error", error)}
      />
    </div>
  )
}

export default FileUpload
