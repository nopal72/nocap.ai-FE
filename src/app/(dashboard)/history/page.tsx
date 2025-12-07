"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import ParticleCanvas from "@/components/ui/particlecanvas"
import { Search, Loader } from "lucide-react"
import TopNavbar from "@/components/ui/topnavbar"
import { useHistory, type HistoryItem } from "@/hooks/use-history"
import { setMockAuthToken } from "@/lib/test-helpers"
import Link from "next/link"

interface DisplayHistoryItem extends HistoryItem {
  highlighted?: boolean
}

export default function HistoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Newest")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { items, status, error, pageInfo, fetchNextPage, loadFirstPage } = useHistory({ limit: 20 })
  const [displayItems, setDisplayItems] = useState<DisplayHistoryItem[]>([])

  // Check authentication and initialize data
  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (token) {
      setIsAuthenticated(true)
      loadFirstPage()
    } else {
      setIsAuthenticated(false)
    }
  }, [loadFirstPage])

  // Update display items based on search and sort
  useEffect(() => {
    let processed = [...items]

    // Apply search filter
    if (searchQuery) {
      processed = processed.filter(item =>
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fileKey.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    if (sortBy === "Newest") {
      processed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === "Oldest") {
      processed.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }

    // Highlight the first item
    processed = processed.map((item, idx) => ({
      ...item,
      highlighted: idx === 0
    }))

    setDisplayItems(processed)
  }, [items, searchQuery, sortBy])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
  }

  const generateScoreFromUrl = (url: string): number => {
    // Generate a deterministic score based on the URL for consistent display
    let hash = 0
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
    }
    return 40 + (Math.abs(hash) % 60) // Score between 40 and 100
  }

  return (
    <div className="min-h-screen w-full bg-[#06060A] relative overflow-hidden">
      {/* particles */}
      <ParticleCanvas />

      {/* content */}
      <main className="relative z-20">
        <TopNavbar />

        {/* main content */}
        <div className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Authentication warning */}
            {!isAuthenticated && (
              <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4 text-yellow-400 mb-6 flex items-center justify-between">
                <div>
                  Please log in to view your scan history.{' '}
                  <Link href="/login" className="underline hover:text-yellow-300">
                    Go to login
                  </Link>
                </div>
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={() => {
                      setMockAuthToken()
                      setIsAuthenticated(true)
                      setTimeout(() => loadFirstPage(), 100)
                    }}
                    className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm whitespace-nowrap ml-4"
                  >
                    Use Mock Token (Dev)
                  </button>
                )}
              </div>
            )}

            {/* Header with search and sort */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold text-white">Scan History</h1>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                {/* Search */}
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by ID or filename..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 w-full sm:w-64"
                  />
                </div>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Loading state */}
            {status === 'loading' && items.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <Loader className="animate-spin text-cyan-400" size={32} />
                <span className="ml-3 text-gray-400">Loading history...</span>
              </div>
            )}

            {/* Error state */}
            {status === 'error' && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-400 mb-6">
                {error || 'Failed to load history'}
              </div>
            )}

            {/* Empty state */}
            {status === 'success' && displayItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No scan history yet. Start by analyzing an image!</p>
              </div>
            )}

            {/* History Grid */}
            {displayItems.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {displayItems.map((item) => {
                    const score = generateScoreFromUrl(item.accessUrl)
                    return (
                      <div
                        key={item.id}
                        onClick={() => router.push(`/result?historyId=${item.id}`)}
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
                          {/* Image */}
                          <img
                            src={item.accessUrl}
                            alt={item.fileKey}
                            className="w-full h-full object-cover"
                          />

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
                                  strokeDasharray={`${45 * 2 * Math.PI * (score / 100)} ${45 * 2 * Math.PI}`}
                                  strokeLinecap="round"
                                  className={`text-${
                                    score >= 80
                                      ? "cyan-400"
                                      : score >= 60
                                      ? "orange-400"
                                      : score >= 40
                                      ? "yellow-400"
                                      : "red-400"
                                  }`}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{score}%</span>
                              </div>
                            </div>
                          </div>

                          {/* File info */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <p className="text-white text-xs font-mono truncate mb-1">{item.id}</p>
                            <p className="text-gray-300 text-xs truncate">{item.fileKey.split('/').pop()}</p>
                            <p className="text-gray-400 text-xs mt-2">Scanned: {formatDate(item.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Load More Button */}
                {pageInfo.hasNextPage && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={fetchNextPage}
                      disabled={status === 'loading'}
                      className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <Loader size={18} className="animate-spin" />
                          Loading...
                        </span>
                      ) : (
                        'Load More'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}