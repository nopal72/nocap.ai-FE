"use client"

import React, { useState } from "react"
import ParticleCanvas from "@/components/ui/particlecanvas"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen w-full bg-[#06060A] relative overflow-hidden flex items-center justify-center">
      {/* particles */}
      <ParticleCanvas />

      {/* content */}
      <main className="relative z-20 w-full max-w-md mx-6">
        <div className="bg-gradient-to-br from-[#1a2332] to-[#0f1419] rounded-3xl p-12 border border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
          {/* Title */}
          <h1 className="text-4xl font-bold text-white text-center mb-12">NOCAP.AI</h1>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full bg-[#1f2937] border-2 border-cyan-400/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition pl-4"
                required
              />
              <Mail size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full bg-[#1f2937] border-2 border-cyan-400/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Confirmation */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password confirmation"
                className="w-full bg-[#1f2937] border-2 border-cyan-400/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>


            {/* Sign In Button */}
            <button
              type="submit"
              className="bg-cyan-400 text-slate-900 font-bold py-3 rounded-xl hover:bg-cyan-300 transition mt-2"
            >
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Google Button */}
          <button className="w-full bg-transparent border-2 border-gray-600 hover:border-cyan-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            google
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-400 text-sm mt-8">
            don't have an account?{" "}
            <a href="/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition">
              login
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}