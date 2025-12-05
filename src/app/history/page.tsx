"use client"

import React, { useState } from "react"
import ParticleCanvas from "@/components/ui/particlecanvas"
import { Search, Menu, X, User } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

export default function HistoryPage() {
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Highest Score")

  // sample history data
  const historyItems = [
    { id: 1, tags: ["[OOTD]", "[Streetwear]"], score: 94, scannedDate: "Dec 05" },
    { id: 2, tags: ["[Foodie]"], score: 88, scannedDate: "Dec 05" },
    { id: 3, tags: ["[Foodie]"], score: 45, scannedDate: "Dec 05" },
    { id: 4, tags: ["[Sunset]"], score: 94, scannedDate: "Dec 05", highlighted: true },
    { id: 5, tags: ["[OOTD]", "[Sunset]"], score: 62, scannedDate: "Dec 05" },
    { id: 6, tags: ["[OOTD]", "[Streetwear]"], score: 94, scannedDate: "Dec 05" },
    { id: 7, tags: ["[Sunset]"], score: 62, scannedDate: "Dec 05" },
    { id: 8, tags: ["[OOTD]"], score: 45, scannedDate: "Dec 05" },
    { id: 9, tags: ["[Foodie]"], score: 88, scannedDate: "Dec 05" },
    { id: 10, tags: ["[Foodie]"], score: 62, scannedDate: "Dec 05" },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "border-cyan-400"
    if (score >= 60) return "border-orange-400"
    if (score >= 40) return "border-yellow-400"
    return "border-red-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-cyan-400"
    if (score >= 60) return "bg-orange-400"
    if (score >= 40) return "bg-yellow-400"
    return "bg-red-400"
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
              <div className="flex items-center text-white">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white hover:border-cyan-400 transition cursor-pointer">
                  <User size={20} className="text-white" />
                </div>
              </div>
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
        <div className="px-8 py-12">
          <div className="max-w-7xl mx-auto">

            {/* History Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className={`group cursor-pointer transition-all ${
                    item.highlighted ? "lg:col-span-1 lg:row-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative rounded-xl overflow-hidden ${
                      item.highlighted
                        ? "border-4 border-cyan-400 shadow-lg shadow-cyan-400/50"
                        : "border-2 border-gray-700 hover:border-cyan-400"
                    } transition-all h-60 ${item.highlighted ? "lg:h-96" : ""}`}
                  >
                    {/* Image Placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-gray-600 text-center">
                        <p className="text-sm">[Image Placeholder]</p>
                      </div>
                    </div>

                    {/* Score Circle */}
                    <div className="absolute top-4 right-4">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="2" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray={`${45 * 2 * Math.PI * (item.score / 100)} ${45 * 2 * Math.PI}`}
                            strokeLinecap="round"
                            className={`text-${
                              item.score >= 80
                                ? "cyan-400"
                                : item.score >= 60
                                ? "orange-400"
                                : item.score >= 40
                                ? "yellow-400"
                                : "red-400"
                            }`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{item.score}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags & Date */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-cyan-400 text-xs font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-400 text-xs">Scanned: {item.scannedDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}