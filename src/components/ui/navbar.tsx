"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { User, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const router = useRouter()

  const handleSignOut = async () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    try {
      const response = await fetch(`${apiBaseUrl}/auth/sign-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        router.push("/login")
      } else {
        console.error("Sign out failed")
      }
    } catch (error) {
      console.error("An error occurred during sign out:", error)
    }
  }

  return (
    <nav className="w-full bg-[#06060A] py-4 px-8 border-b border-gray-800">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <div className="text-white text-2xl font-bold px-6 py-3 min-w-fit cursor-pointer hover:text-cyan-400 transition">
            NOCAP.AI
          </div>
        </Link>

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

        <div className="flex items-center gap-4 ml-auto">
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-cyan-400 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}

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

      {isMobile && isMenuOpen && (
        <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-gray-700">
          <Link href="/analyze" className="text-white hover:text-cyan-400 transition">
            NEW ANALYZE
          </Link>
          <a href="/history" className="text-cyan-400 hover:text-cyan-400 transition">
            HISTORY
          </a>
        </div>
      )}
    </nav>
  )
}
