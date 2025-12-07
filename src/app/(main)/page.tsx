"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { User, Menu, X, Zap, TrendingUp } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import ParticleCanvas from "@/components/ui/particlecanvas"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Home() {

  const isMobile = useIsMobile()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is authenticated
  useEffect(() => {
    const token = Cookies.get('auth_token')
    setIsAuthenticated(!!token)
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#06060A] font-sans overflow-x-hidden">
        {/* navbar */}
        <nav className="w-full bg-[#06060A] py-4 px-8">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="text-white text-2xl font-bold px-6 py-3 min-w-fit">
              <Image src="/images/logo-dark.webp" alt="NOCAP.AI Logo" width={120} height={32} />
            </div>
            
            {/* Menu Items - Desktop */}
            {!isMobile && (
              <div className="flex items-center gap-12 flex-1 justify-center ml-8">
                <a href="#home" className="text-white hover:text-cyan-400 transition">HOME</a>
                <a href="#feature" className="text-white hover:text-cyan-400 transition">FEATURE</a>
                <a href="#work" className="text-white hover:text-cyan-400 transition">HOW IT WORK</a>
                <a href="#analyze" className="text-white hover:text-cyan-400 transition">ANALYZE</a>
              </div>
            )}

            {/* Mobile Menu & Login */}
            <div className="flex items-center gap-4">
              {isMobile && (
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white hover:text-cyan-400 transition"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
              
              {/* Login - Only show if not authenticated */}
              {!isAuthenticated && (
                <a href="/login"  className="flex items-center gap-2 text-white cursor-pointer hover:text-cyan-400 transition">
                  <User size={24} />
                  {!isMobile && <span>Login</span>}
                </a>
              )}
              
              {/* Dashboard - Only show if authenticated */}
              {isAuthenticated && (
                <a href="/analyze" className="flex items-center gap-2 text-white cursor-pointer hover:text-cyan-400 transition">
                  <User size={24} />
                  {!isMobile && <span>Dashboard</span>}
                </a>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobile && isMenuOpen && (
            <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-gray-700">
              <a href="#home" className="text-white hover:text-cyan-400 transition">HOME</a>
              <a href="#feature" className="text-white hover:text-cyan-400 transition">FEATURE</a>
              <a href="#work" className="text-white hover:text-cyan-400 transition">HOW IT WORK</a>
              <a href="#analyze" className="text-white hover:text-cyan-400 transition">ANALYZE</a>
              {!isAuthenticated && (
                <a href="/login" className="text-white hover:text-cyan-400 transition">Login</a>
              )}
              {isAuthenticated && (
                <a href="/analyze" className="text-white hover:text-cyan-400 transition">Dashboard</a>
              )}
            </div>
          )}
        </nav>

        <ParticleCanvas />

        <div className="relative z-10">
          {/* Hero Section */}
          <section id="home" className="w-full min-h-[100vh] md:min-h-[110vh] py-32 px-8 text-center relative flex items-center justify-center" style={{backgroundImage: "url('/images/hero-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
            {/* particles canvas (below overlay and content) */}
            <ParticleCanvas />

            {/* overlay - above particles */}
            <div className="absolute inset-0 bg-black/55 "></div>

            {/* content - above overlay */}
            <div className="relative z-20 max-w-4xl">
              <h1 className="text-4xl md:text-6xl leading-tight font-bold text-white mb-6">
                See Beyond the Likes.<br />Decode Your Content with AI.
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mb-8">
                Dapatkan analisis mendalam dari setiap piksel foto dan basis caption Anda. Teknologi AI kami memindahkan sentimen, memprediksi engagement, dan memberikan wawasan data yang tidak terbatas oleh mata biasa.
              </p>
              <a href="/analyze" className="bg-cyan-400 text-slate-900 font-bold px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-cyan-300 transition">
                try it now
              </a>
            </div>
          </section>

          {/* The Dual Core Engine */}
          <section id="feature" className="w-full py-20 px-8 bg-[#06060A]">
            <h2 className="text-4xl font-bold text-white text-center mb-16">The Dual Core Engine</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              Dapatkan analisis mendalam dari setiap piksel foto dan basis caption Anda. Teknologi AI kami memindahkan sentimen, memprediksi engagement, dan memberikan wawasan data yang tidak terbatas oleh mata biasa.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* AI Copywriter */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-700 p-4 rounded-full">
                    <Zap size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Copywriter</h3>
                <p className="text-gray-400">
                  Caption instan berbasis psikologi. Dapatkan kombinasi kata, emoji, dan CTA yang terbukti memicu interaksi maksimal.
                </p>
              </div>

              {/* Predictive Analytics */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-700 p-4 rounded-full">
                    <TrendingUp size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Predictive Analytics</h3>
                <p className="text-gray-400">
                  Stop menebak. Prediksi Reach dan skor viralitas konten Anda sebelum posting menggunakan analisis pola visual presisi.
                </p>
              </div>
            </div>
          </section>

          {/* How It Work */}
          <section id="work" className="w-full py-20 px-8 bg-[#06060A]">
            <h2 className="text-4xl font-bold text-white text-center mb-16">How It Work</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-3">1. Upload Media</h3>
                  <p className="text-gray-400">
                    Tarik foto atau draft desain Anda ke dalam scan zone. Sistem mendukung format JPG dan PNG
                  </p>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-3">2. AI Analysis</h3>
                  <p className="text-gray-400">
                    Algoritma membedah piksel, mendeteksi objek, dan menganalisis sentimen emosi dalam hitungan detik.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">3. Actionable Result</h3>
                  <p className="text-gray-400">
                    Terima draf caption, rekomendasi hashtag, dan prediksi skor viralitas. Siap untuk diposting.
                  </p>
                </div>
              </div>

              {/* Placeholder Image */}
              <div className="flex items-center justify-center">
                <div className="bg-gray-600 w-full h-96 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-xl">SS HALAMAN FITUR APLIKASI</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section id="analyze" className="w-full py-20 px-8 text-center bg-[#06060A]">
            <h2 className="text-4xl font-bold text-white mb-4">
              Don't Just Post<br />Dominate the Algorithm
            </h2>
            <p className="text-gray-400 mb-8">
              Tingkatkan cara lama. Mulai gunakan kecerdasan buatan untuk strategi posting yang lebih baik
            </p>
            <a href="/analyze" className="bg-cyan-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-cyan-300 transition">
              Start Analize
            </a>
          </section>
        </div>

        {/* Footer */}
        <footer className="w-full bg-slate-950 py-16 px-8 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand Section */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">NOCAP.AI</h3>
                <p className="text-gray-400 mb-4">see beyond the likes</p>
                <div className="border-b-2 border-cyan-400 w-12 mb-6"></div>
                <a href="#" className="text-white hover:text-cyan-400 transition inline-block">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>

              {/* Navigation Section */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">Navigation</h4>
                <ul className="space-y-3">
                  <li><a href="#home" className="text-gray-400 hover:text-cyan-400 transition">HOME</a></li>
                  <li><a href="#feature" className="text-gray-400 hover:text-cyan-400 transition">FEATURE</a></li>
                  <li><a href="#work" className="text-gray-400 hover:text-cyan-400 transition">HOW IT WORK</a></li>
                  <li><a href="#analyze" className="text-gray-400 hover:text-cyan-400 transition">ANALYSZE</a></li>
                </ul>
              </div>

              {/* Legal & Help Section */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">Legal & Help</h4>
                <ul className="space-y-3">
                  <li><a href="/privacy-policy" className="text-gray-400 hover:text-cyan-400 transition">Privacy Policy</a></li>
                  <li><a href="/terms&condition" className="text-gray-400 hover:text-cyan-400 transition">Terms & Condition</a></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm">© 2024 NOCAP. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </div>
  );
}