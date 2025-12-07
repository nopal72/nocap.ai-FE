"use client"

import { useEffect, useRef } from "react"

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // make canvas fixed to viewport (avoid resizing on scroll)
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100vw"
    canvas.style.height = "100vh"
    canvas.style.pointerEvents = "none"

    const setSize = () => {
      const w = Math.max(1, window.innerWidth)
      const h = Math.max(1, window.innerHeight)
      canvas.width = w
      canvas.height = h
    }
    setSize()

    let w = canvas.width
    let h = canvas.height

    // particle params (velocities are px/sec -> stable with time delta)
    const baseSpeed = 12 // px per second (tweak to make brighter/faster)
    let particles: { x:number,y:number,vx:number,vy:number,r:number,alpha:number }[] = []
    const maxParticles = () => Math.max(18, Math.round((w*h) / 110000))

    const initParticles = () => {
      particles = []
      const count = maxParticles()
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = (Math.random() * 0.6 + 0.2) * baseSpeed
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 0.6 + Math.random() * 3.0,
          // brighter alpha by default; you can lower if too strong
          alpha: 0.04 + Math.random() * 0.14
        })
      }
    }
    initParticles()

    let raf = 0
    let lastT = performance.now()
    // fade control when footer visible
    let visibleAlpha = 1

    const draw = (t: number) => {
      const dt = Math.min(0.05, (t - lastT) / 1000) // clamp dt to avoid huge jumps
      lastT = t

      // detect footer in viewport; if visible, fade out particles
      const footer = document.querySelector("footer")
      let footerVisible = false
      if (footer) {
        const rect = footer.getBoundingClientRect()
        // footer visible even partially -> consider it visible
        footerVisible = rect.top < window.innerHeight && rect.bottom > 0
      }

      // smooth fade in/out
      const targetAlpha = footerVisible ? 0 : 1
      visibleAlpha += (targetAlpha - visibleAlpha) * Math.min(1, dt * 6) // quick lerp

      // clear and draw only if visibleAlpha > tiny
      ctx.clearRect(0, 0, w, h)
      if (visibleAlpha > 0.01) {
        ctx.globalCompositeOperation = "lighter"

        for (const p of particles) {
          p.x += p.vx * dt
          p.y += p.vy * dt

          // wrap
          if (p.x < -20) p.x = w + 20
          if (p.x > w + 20) p.x = -20
          if (p.y < -20) p.y = h + 20
          if (p.y > h + 20) p.y = -20

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
          const a = p.alpha * visibleAlpha
          grad.addColorStop(0, `rgba(18,234,255,${a})`)
          grad.addColorStop(0.5, `rgba(18,234,255,${a * 0.28})`)
          grad.addColorStop(1, `rgba(18,234,255,0)`)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
          ctx.fill()
        }

        // faint connecting lines (also reduced by visibleAlpha)
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j]
            const dx = a.x - b.x, dy = a.y - b.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 110) {
              ctx.strokeStyle = `rgba(18,234,255,${(0.06 * (1 - dist / 110)) * visibleAlpha})`
              ctx.lineWidth = 0.35
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }

        ctx.globalCompositeOperation = "source-over"
      }

      raf = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      setSize()
      w = canvas.width
      h = canvas.height
      initParticles()
    }

    window.addEventListener("resize", handleResize)
    // remove scroll-driven resize — only use scroll to check footer visibility inside draw
    draw(performance.now())

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      // fixed supaya selalu cover viewport, z-10 agar berada di atas background tetapi bawah konten
     className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
     style={{ mixBlendMode: "screen", willChange: "transform, opacity" }}
    />
  )
}

export default ParticleCanvas