"use client"

import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ParticleCanvas from "@/components/ui/particlecanvas"
import { Upload, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSignOut } from "@/hooks/useSignOut"
import { useImageAnalysis } from "@/hooks/useImageAnalysis"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AnalyzePage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isMobile = useIsMobile()
  const router = useRouter()
  const { signOut } = useSignOut()
  const {
    generateAnalysis,
    loadingState,
    uploadProgress,
    analysisResult,
    error,
  } = useImageAnalysis()

  const handleSignOut = async () => {
    await signOut()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    setSelectedFile(file)
    // Create a preview URL
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
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
    if (file && file.type.startsWith("image/")) {
      handleFile(file)
    }
  }

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      generateAnalysis(selectedFile, preview).then((result) => {
        // After analysis is successful, you might want to redirect
        // For now, we'll rely on the hook's state to show results
      })
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
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left */}
            <Link href="/">
              <div className="text-white text-2xl font-bold px-6 py-3 min-w-fit cursor-pointer hover:text-cyan-400 transition">
                NOCAP.AI
              </div>
            </Link>

            {/* Menu Items - Center (Desktop) */}
            {!isMobile && (
              <div className="flex items-center gap-12 flex-1 justify-center">
                <Link href="/analyze" className="text-gray-400 hover:text-cyan-400 transition">
                  NEW ANALYZE
                </Link>
                <a href="/history" className="text-gray-400 hover:text-cyan-400 transition">
                  HISTORY
                </a>
              </div>
            )}

            {/* Mobile Menu & Profile - Right */}
            <div className="flex items-center gap-4 ml-auto">
              {isMobile && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white hover:text-cyan-400 transition"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}

              {/* Profile & Credits */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white hover:border-cyan-400 transition cursor-pointer">
                    <User size={20} className="text-white" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-[#1a2332] text-white border-cyan-400/30">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:bg-cyan-400/20">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobile && isMenuOpen && (
            <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-gray-700">
              <Link href="/dashboard" className="text-white hover:text-cyan-400 transition">
                NEW ANALYZE
              </Link>
              <a href="/history" className="text-cyan-400 hover:text-cyan-400 transition">
                HISTORY
              </a>
            </div>
          )}
        </nav>


        {/* main content */}
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-8 py-20">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              content analyze
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
              className="border-2 border-dashed border-gray-600 rounded-2xl p-12 mb-6 transition-colors duration-300 hover:border-cyan-400 cursor-pointer"
              onClick={handleSelectFileClick}
            >
              {preview ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-48 rounded-lg object-cover"
                  />
                  <p className="text-gray-400 text-sm">
                    Click atau drag untuk ubah file
                  </p>
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
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Action Button & Status */}
            <div className="h-20 flex flex-col items-center justify-center">
              {loadingState === "idle" && selectedFile && (
                <button
                  onClick={handleAnalyzeClick}
                  className="bg-cyan-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-cyan-300 transition mb-4"
                >
                  Analyze Now
                </button>
              )}

              {loadingState === "presigning" && (
                <p className="text-cyan-400">Preparing upload...</p>
              )}

              {loadingState === "uploading" && (
                <div className="w-full max-w-sm">
                  <p className="text-white mb-2">Uploading: {uploadProgress}%</p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-cyan-400 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {loadingState === "analyzing" && (
                <p className="text-cyan-400">Analyzing image, please wait...</p>
              )}

              {loadingState === "success" && (
                <p className="text-green-400">Analysis complete! Redirecting...</p>
              )}

              {error && <p className="text-red-500">Error: {error}</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}