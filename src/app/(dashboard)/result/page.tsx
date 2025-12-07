"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"
import ParticleCanvas from "@/components/ui/particlecanvas"
import { Copy, Shield, Music, Tag, Loader } from "lucide-react"
import Link from "next/link"
import TopNavbar from "@/components/ui/topnavbar"
import { useHistoryDetail, type DetailedHistoryItem } from "@/hooks/useHistoryDetail"

// Define the structure for the analysis result
interface AnalysisResult {
  imageUrl?: string
  curation: { isAppropriate: boolean; labels: string[]; risk: string; notes?: string }
  caption: { text: string; alternatives: string[] }
  songs: { title: string; artist: string; reason: string }[]
  topics: { topic: string; confidence: number }[]
  engagement: { estimatedScore: number; drivers: string[]; suggestions: string[] }
  meta?: { language: string; generatedAt: string }
}

export default function ResultPage() {
  return (
    // Suspense boundary diperlukan karena ResultContent menggunakan useSearchParams()
    <Suspense fallback={<LoadingScreen />}>
      <ResultContent />
    </Suspense>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen w-full bg-[#06060A] flex items-center justify-center">
      <Loader className="animate-spin text-cyan-400" size={32} />
    </div>
  )
}

function ResultContent() {
  const [copiedCaption, setCopiedCaption] = useState(false)
  const [captionView, setCaptionView] = useState<"main" | "remixes">("main")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isFromHistory, setIsFromHistory] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const historyId = searchParams.get('historyId')
  const { item: historyDetail, status: historyStatus, fetchDetail } = useHistoryDetail()

  // Check authentication on mount
  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (!token) {
      router.replace('/login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  // Effect to handle data loading
  useEffect(() => {
    if (historyId) {
      // Load from history
      setIsFromHistory(true)
      fetchDetail(historyId)
    } else {
      // Load from sessionStorage (from analyze flow)
      const storedResult = sessionStorage.getItem("analysisResult")
      if (storedResult) {
        setResult(JSON.parse(storedResult))
        setIsFromHistory(false)
      } else {
        // If no data, redirect back to the analyze page
        router.replace("/analyze")
      }
    }
  }, [historyId, fetchDetail, router])

  // Convert history detail to result format
  useEffect(() => {
    if (historyDetail && isFromHistory) {
      const converted: AnalysisResult = {
        imageUrl: historyDetail.imageUrl,
        curation: {
          isAppropriate: historyDetail.curation.isAppropriate,
          labels: historyDetail.curation.labels,
          risk: historyDetail.curation.risk,
          notes: historyDetail.curation.notes
        },
        caption: historyDetail.caption,
        songs: historyDetail.songs,
        topics: historyDetail.topics,
        engagement: historyDetail.engagement,
        meta: historyDetail.meta
      }
      setResult(converted)
    }
  }, [historyDetail, isFromHistory])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#06060A] relative overflow-hidden flex items-center justify-center">
        <ParticleCanvas />
        <div className="relative z-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            <p className="text-white mt-4">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  const handleCopyCaption = (textToCopy: string) => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setCopiedCaption(true)
      setTimeout(() => setCopiedCaption(false), 2000)
    }
  }

  // Loading state for history
  if (isFromHistory && historyStatus === 'loading') {
    return (
      <div className="min-h-screen w-full bg-[#06060A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader className="animate-spin text-cyan-400" size={32} />
          <p className="text-cyan-400">Loading history details...</p>
        </div>
      </div>
    )
  }

  // Error state for history
  if (isFromHistory && historyStatus === 'error') {
    return (
      <div className="min-h-screen w-full bg-[#06060A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load history details</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen w-full bg-[#06060A] flex items-center justify-center">
        <p className="text-cyan-400">Loading results...</p>
      </div>
    )
  }

  const viralPotential = Math.round(result.engagement.estimatedScore * 100)

  return (
    <div className="min-h-screen w-full bg-[#06060A] relative overflow-hidden">
      {/* particles */}
      <ParticleCanvas />

      {/* content */}
      <main className="relative z-20">
        <TopNavbar showBackButton={isFromHistory} backButtonLabel="← Back to History" />

        {/* main content */}
        <div className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Section - Image & Tags */}
              <div className="flex flex-col gap-6">
                {/* Image Preview */}
                <div className="border-2 border-cyan-400 rounded-2xl overflow-hidden shadow-lg shadow-cyan-400/30 bg-black">
                  {result.imageUrl ? (
                    <img
                      src={result.imageUrl}
                      alt="Analyzed content"
                      className="w-full h-auto max-h-[24rem] object-contain"
                    />
                  ) : (
                    <div className="bg-gray-800 h-64 md:h-80 flex items-center justify-center">
                      <p className="text-gray-500 text-lg">No Image Preview</p>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {result.curation.labels.map((label) => (
                    <span
                      key={label}
                      className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold uppercase"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* System Secure */}
                <div className="border border-cyan-400/50 rounded-xl p-6 flex items-center gap-4">
                  <Shield size={32} className="text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">OVERALL SCORE:</p>
                    <p className="text-green-400 font-bold text-lg capitalize">
                      Risk {result.curation.risk}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section - Analysis */}
              <div className="flex flex-col gap-6">
                {/* Diagnosis */}
                <div className="border border-cyan-400/50 rounded-xl p-8">
                  <h3 className="text-gray-400 text-sm font-semibold mb-6">
                    DIAGNOSIS
                  </h3>

                  {/* Circular Progress */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-40 h-40">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        {/* background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#374151"
                          strokeWidth="3"
                        />
                        {/* progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#00D9FF"
                          strokeWidth="3"
                          strokeDasharray={`${45 * 2 * Math.PI * (viralPotential / 100)} ${45 * 2 * Math.PI}`}
                          strokeLinecap="round"
                          filter="drop-shadow(0 0 8px #00D9FF)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-4xl font-bold text-white">
                          {viralPotential}%
                        </p>
                        <p className="text-gray-400 text-xs text-center mt-1">
                          VIRAL POTENTIAL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="space-y-3">
                    {result.engagement.suggestions.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-yellow-400 text-xl">⚠</span>
                        <div>
                          <p className="text-gray-300 text-sm">
                            <span className="font-semibold">Tip:</span> {tip}
                          </p>
                        </div>
                      </div>
                    ))}
                    {result.engagement.drivers.map((driver, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-green-400 text-xl">✓</span>
                        <div>
                          <p className="text-gray-300 text-sm">
                            <span className="font-semibold text-green-400">
                              Driver:
                            </span>{" "}
                            {driver}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Caption Architect */}
                <div className="border border-cyan-400/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-400 text-sm font-semibold">
                      CAPTION ARCHITECT
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCaptionView("main")}
                        className={`font-semibold text-xs border px-3 py-1 rounded transition-colors ${
                          captionView === "main"
                            ? "text-cyan-400 border-cyan-400"
                            : "text-gray-400 border-gray-600 hover:bg-gray-700"
                        }`}
                      >
                        MAIN PICK
                      </button>
                      <button
                        onClick={() => setCaptionView("remixes")}
                        className={`font-semibold text-xs border px-3 py-1 rounded transition-colors ${
                          captionView === "remixes"
                            ? "text-cyan-400 border-cyan-400"
                            : "text-gray-400 border-gray-600 hover:bg-gray-700"
                        }`}
                      >
                        ALTERNATIVE
                      </button>
                    </div>
                  </div>

                  {captionView === "main" ? (
                    <>
                      <p className="text-gray-300 text-base mb-6 leading-relaxed">
                        {result.caption.text}
                      </p>
                      <button
                        onClick={() => handleCopyCaption(result.caption.text)}
                        className={`w-full font-bold py-2 rounded-lg transition ${
                          copiedCaption
                            ? "bg-green-400 text-green-900"
                            : "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
                        }`}
                      >
                        {copiedCaption ? "✓ COPIED" : "COPY TEXT"}
                      </button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      {result.caption.alternatives.map((alt, index) => (
                        <div
                          key={index}
                          className="bg-gray-800/50 p-4 rounded-lg flex justify-between items-start gap-4"
                        >
                          <p className="text-gray-300 text-sm leading-relaxed flex-1">
                            {alt}
                          </p>
                          <button onClick={() => handleCopyCaption(alt)} title="Copy alternative caption">
                            <Copy className="text-gray-400 hover:text-cyan-400 w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sonic Vibe */}
                <div className="border border-cyan-400/50 rounded-xl p-6">
                  <h3 className="text-gray-400 text-sm font-semibold mb-4 flex items-center gap-2">
                    <Music size={16} /> SONIC VIBE
                  </h3>
                  <div className="space-y-3">
                    {result.songs.map((song) => (
                      <div key={song.title} className="flex items-center gap-3">
                        <Music size={16} className="text-cyan-400" />
                        <div className="flex-1">
                          <p className="text-gray-300 text-sm">
                            <span className="font-semibold">{song.title}</span> -{" "}
                            {song.artist} ({song.reason})
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topic DNA */}
                <div className="border border-cyan-400/50 rounded-xl p-6">
                  <h3 className="text-gray-400 text-sm font-semibold mb-4 flex items-center gap-2">
                    <Tag size={16} /> TOPIC DNA
                  </h3>
                  <div className="space-y-4">
                    {result.topics.map((topic) => (
                      <div key={topic.topic}>
                        <div className="flex justify-between mb-2">
                          <p className="text-gray-300 text-sm">{topic.topic}</p>
                          <p className="text-cyan-400 font-semibold text-sm">
                            {Math.round(topic.confidence * 100)}%
                          </p>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-cyan-400 h-2 rounded-full"
                            style={{ width: `${topic.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}