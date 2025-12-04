"use client"

import React, { useState } from "react"
import ParticleCanvas from "@/components/ui/particlecanvas"
import { Copy, Shield, Music, Tag } from "lucide-react"
import Link from "next/link"

export default function ResultPage() {
  const [copiedCaption, setCopiedCaption] = useState(false)

  const handleCopyCaption = () => {
    navigator.clipboard.writeText("Sunset hues over the quiet coastline.")
    setCopiedCaption(true)
    setTimeout(() => setCopiedCaption(false), 2000)
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
            <div className="text-white text-2xl font-bold">NoCap.AI</div>
          </Link>
        </nav>

        {/* main content */}
        <div className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Section - Image & Tags */}
              <div className="flex flex-col gap-6">
                {/* Image Preview */}
                <div className="border-2 border-cyan-400 rounded-2xl overflow-hidden shadow-lg shadow-cyan-400/30">
                  <div className="bg-gray-800 h-64 md:h-80 flex items-center justify-center">
                    <p className="text-gray-500 text-lg">[IMAGE PREVIEW]</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  <span className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold">
                    [OUTDOOR]
                  </span>
                  <span className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold">
                    [LANDSCAPE]
                  </span>
                </div>

                {/* System Secure */}
                <div className="border border-cyan-400/50 rounded-xl p-6 flex items-center gap-4">
                  <Shield size={32} className="text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">SYSTEM SECURE:</p>
                    <p className="text-green-400 font-bold text-lg">Risk Low</p>
                  </div>
                </div>
              </div>

              {/* Right Section - Analysis */}
              <div className="flex flex-col gap-6">
                {/* Diagnosis */}
                <div className="border border-cyan-400/50 rounded-xl p-8">
                  <h3 className="text-gray-400 text-sm font-semibold mb-6">DIAGNOSIS</h3>

                  {/* Circular Progress */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* background circle */}
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="3" />
                        {/* progress circle (78%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#00D9FF"
                          strokeWidth="3"
                          strokeDasharray={`${45 * 2 * Math.PI * 0.78} ${45 * 2 * Math.PI}`}
                          strokeLinecap="round"
                          filter="drop-shadow(0 0 8px #00D9FF)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-4xl font-bold text-white">78%</p>
                        <p className="text-gray-400 text-xs text-center mt-1">VIRAL POTENTIAL</p>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 text-xl">⚠</span>
                      <div>
                        <p className="text-gray-300 text-sm">
                          <span className="font-semibold">Tip:</span> Add a human subject
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 text-xl">⚠</span>
                      <div>
                        <p className="text-gray-300 text-sm">
                          <span className="font-semibold">Tip:</span> Include location tag
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <div>
                        <p className="text-gray-300 text-sm">
                          <span className="font-semibold text-green-400">Driver:</span> Strong color palette
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Caption Architect */}
                <div className="border border-cyan-400/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-400 text-sm font-semibold">CAPTION ARCHITECT</h3>
                    <div className="flex gap-2">
                      <button className="text-cyan-400 font-semibold text-xs border border-cyan-400 px-3 py-1 rounded">
                        MAIN PICK
                      </button>
                      <button className="text-gray-400 font-semibold text-xs border border-gray-600 px-3 py-1 rounded">
                        REMIXES
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-300 text-base mb-6 leading-relaxed">
                    Sunset hues over the quiet coastline.
                  </p>

                  <button
                    onClick={handleCopyCaption}
                    className={`w-full font-bold py-2 rounded-lg transition ${
                      copiedCaption
                        ? "bg-green-400 text-green-900"
                        : "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
                    }`}
                  >
                    {copiedCaption ? "✓ COPIED" : "[ COPY TEXT ]"}
                  </button>
                </div>

                {/* Sonic Vibe */}
                <div className="border border-cyan-400/50 rounded-xl p-6">
                  <h3 className="text-gray-400 text-sm font-semibold mb-4 flex items-center gap-2">
                    <Music size={16} /> SONIC VIBE
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Music size={16} className="text-cyan-400" />
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm">
                          <span className="font-semibold">Ocean Eyes</span> - Billie Eilish (Calm vibe)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Music size={16} className="text-cyan-400" />
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm">
                          <span className="font-semibold">Sunset Lover</span> - Petit Biscuit (Warm mood)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topic DNA */}
                <div className="border border-cyan-400/50 rounded-xl p-6">
                  <h3 className="text-gray-400 text-sm font-semibold mb-4 flex items-center gap-2">
                    <Tag size={16} /> TOPIC DNA
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-300 text-sm">Travel</p>
                        <p className="text-cyan-400 font-semibold text-sm">94%</p>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-cyan-400 h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-300 text-sm">Photography</p>
                        <p className="text-cyan-400 font-semibold text-sm">89%</p>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-cyan-400 h-2 rounded-full" style={{ width: "89%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-300 text-sm">Nature</p>
                        <p className="text-cyan-400 font-semibold text-sm">87%</p>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-cyan-400 h-2 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                    </div>
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