"use client"

import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import ParticleCanvas from "@/components/ui/particlecanvas"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen w-full bg-[#06060A] relative overflow-hidden flex items-center justify-center">

    <ParticleCanvas />

      {/* card */}
      <main className="relative z-20 w-full max-w-md mx-6">
        <div className="bg-[#202731] rounded-2xl p-10 md:p-12 shadow-lg">
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-gray-300 mb-4">email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="w-full bg-transparent border-b-4 border-white h-10 text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-300 mb-4">password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                className="w-full bg-transparent border-b-4 border-white h-10 text-white placeholder-gray-500 focus:outline-none pr-12"
                required
              />
              <button
                type="button"
                aria-label="toggle password"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-0 top-9 transform translate-y-1/2 mr-1 text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-300 text-sm">
                don't have an account?{" "}
                <a href="/register" className="font-semibold text-white hover:text-cyan-400">
                  signup
                </a>
              </p>
            </div>

            <div className="flex items-center gap-4 flex-col">
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-cyan-400 text-slate-900 font-semibold rounded-full px-8 py-2 md:px-10 md:py-3"
                >
                  Sign in
                </button>
              </div>

              <div className="text-gray-400 text-sm">or</div>

              <button
                type="button"
                className="bg-cyan-400 text-slate-900 rounded-lg px-8 py-2 font-medium"
              >
                google
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}