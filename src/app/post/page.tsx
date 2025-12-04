"use client"

import React, { useRef, useState } from "react"
import ParticleCanvas from "@/components/ui/particlecanvas"
import { Upload } from "lucide-react"
import Link from "next/link"

export default function PostPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-cyan-400")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-cyan-400")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-cyan-400")
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#06060A] relative overflow-hidden">
      {/* particles */}
      <ParticleCanvas />

      {/* content */}
      <main className="relative z-20">
        {/* navbar */}
        <nav className="w-full bg-[#06060A] py-4 px-8 border-b border-gray-800">
          <Link href="/">
            <div className="bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl w-fit">
              LOGO
            </div>
          </Link>
        </nav>

        {/* main content */}
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-8 py-20">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              content analys
            </h1>
            <p className="text-gray-400 text-base md:text-lg mb-12">
              upload konten anda dengan meneken tombol di bawah ini dan AI kami akan
              menganalisisnya
            </p>

            {/* file upload area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-600 rounded-2xl p-12 mb-6 transition-colors hover:border-cyan-400 cursor-pointer"
              onClick={handleSelectFileClick}
            >
              {preview ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-48 rounded-lg object-cover"
                  />
                  <p className="text-gray-400 text-sm">Click atau drag untuk ubah file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Upload size={48} className="text-cyan-400" />
                  <p className="text-gray-300 text-lg">Drag file anda kesini</p>
                  <p className="text-gray-500 text-sm">atau klik tombol di bawah</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* select file button */}
            <button
              onClick={handleSelectFileClick}
              className="bg-cyan-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-cyan-300 transition mb-4"
            >
              select file
            </button>

            {/* file info */}
            <p className="text-gray-500 text-sm">
              {selectedFile
                ? `File dipilih: ${selectedFile.name}`
                : "atau seret file nya kesini"}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}