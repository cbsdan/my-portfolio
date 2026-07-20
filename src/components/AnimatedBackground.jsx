import { useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './AnimatedBackground.css'

const THEME_PALETTES = {
  'aurora-borealis': {
    skyTop: '#01050a',
    skyBottom: '#041014',
    curtains: [
      { color1: 'rgba(0, 255, 170, 0.40)', color2: 'rgba(0, 204, 204, 0.20)', color3: 'rgba(123, 104, 238, 0.12)', height: 0.55, speed: 0.0008, freq: 0.003, amp: 60 },
      { color1: 'rgba(51, 255, 170, 0.30)', color2: 'rgba(0, 230, 138, 0.25)', color3: 'rgba(168, 85, 247, 0.15)', height: 0.45, speed: 0.0012, freq: 0.004, amp: 80 },
      { color1: 'rgba(0, 204, 255, 0.35)', color2: 'rgba(0, 255, 136, 0.20)', color3: 'rgba(99, 102, 241, 0.12)', height: 0.38, speed: 0.0006, freq: 0.0025, amp: 90 },
      { color1: 'rgba(123, 104, 238, 0.25)', color2: 'rgba(0, 255, 200, 0.30)', color3: 'rgba(34, 211, 238, 0.08)', height: 0.62, speed: 0.0009, freq: 0.0035, amp: 70 },
    ],
  },
  'midnight-cosmos': {
    skyTop: '#02020a',
    skyBottom: '#06061a',
    curtains: [
      { color1: 'rgba(108, 99, 255, 0.35)', color2: 'rgba(0, 212, 255, 0.20)', color3: 'rgba(255, 107, 255, 0.12)', height: 0.55, speed: 0.0008, freq: 0.003, amp: 60 },
      { color1: 'rgba(0, 212, 255, 0.30)', color2: 'rgba(139, 92, 246, 0.25)', color3: 'rgba(59, 130, 246, 0.15)', height: 0.45, speed: 0.0012, freq: 0.004, amp: 80 },
      { color1: 'rgba(168, 85, 247, 0.32)', color2: 'rgba(99, 102, 241, 0.20)', color3: 'rgba(236, 72, 153, 0.12)', height: 0.40, speed: 0.0007, freq: 0.0028, amp: 85 },
    ],
  },
  'sunset-horizon': {
    skyTop: '#080402',
    skyBottom: '#120905',
    curtains: [
      { color1: 'rgba(255, 107, 53, 0.35)', color2: 'rgba(255, 193, 7, 0.20)', color3: 'rgba(255, 64, 129, 0.12)', height: 0.55, speed: 0.0008, freq: 0.003, amp: 60 },
      { color1: 'rgba(255, 64, 129, 0.30)', color2: 'rgba(255, 143, 96, 0.25)', color3: 'rgba(245, 158, 11, 0.15)', height: 0.45, speed: 0.0012, freq: 0.004, amp: 80 },
      { color1: 'rgba(245, 158, 11, 0.32)', color2: 'rgba(239, 68, 68, 0.20)', color3: 'rgba(217, 70, 239, 0.12)', height: 0.40, speed: 0.0007, freq: 0.0028, amp: 85 },
    ],
  },
  'ocean-depths': {
    skyTop: '#01040a',
    skyBottom: '#030d18',
    curtains: [
      { color1: 'rgba(14, 165, 233, 0.35)', color2: 'rgba(6, 214, 160, 0.20)', color3: 'rgba(139, 92, 246, 0.12)', height: 0.55, speed: 0.0008, freq: 0.003, amp: 60 },
      { color1: 'rgba(6, 214, 160, 0.30)', color2: 'rgba(56, 189, 248, 0.25)', color3: 'rgba(34, 211, 238, 0.15)', height: 0.45, speed: 0.0012, freq: 0.004, amp: 80 },
      { color1: 'rgba(34, 211, 238, 0.32)', color2: 'rgba(2, 132, 199, 0.20)', color3: 'rgba(16, 185, 129, 0.12)', height: 0.40, speed: 0.0007, freq: 0.0028, amp: 85 },
    ],
  },
  'sakura-dream': {
    skyTop: '#0c070e',
    skyBottom: '#150b16',
    curtains: [
      { color1: 'rgba(233, 30, 140, 0.30)', color2: 'rgba(255, 111, 145, 0.20)', color3: 'rgba(156, 39, 176, 0.12)', height: 0.55, speed: 0.0008, freq: 0.003, amp: 60 },
      { color1: 'rgba(255, 111, 145, 0.25)', color2: 'rgba(244, 114, 182, 0.25)', color3: 'rgba(192, 132, 252, 0.15)', height: 0.45, speed: 0.0012, freq: 0.004, amp: 80 },
      { color1: 'rgba(192, 132, 252, 0.30)', color2: 'rgba(236, 72, 153, 0.20)', color3: 'rgba(251, 113, 133, 0.12)', height: 0.40, speed: 0.0007, freq: 0.0028, amp: 85 },
    ],
  },
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 40
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 30
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initStars()
    }

    window.addEventListener('resize', handleResize)

    // Generate stars
    let stars = []
    const initStars = () => {
      stars = []
      const starCount = Math.floor((width * height) / 8000)
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.85,
          radius: Math.random() * 1.5 + 0.3,
          baseAlpha: Math.random() * 0.7 + 0.2,
          alpha: 0,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        })
      }
    }
    initStars()

    // Shooting stars
    let shootingStar = null
    const maybeSpawnShootingStar = () => {
      if (!shootingStar && Math.random() < 0.008) {
        shootingStar = {
          x: Math.random() * width * 0.7,
          y: Math.random() * height * 0.3,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 10 + 12,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1,
        }
      }
    }

    let time = 0

    const render = () => {
      time += 1

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      const palette = THEME_PALETTES[theme] || THEME_PALETTES['aurora-borealis']

      // Draw sky background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height)
      bgGrad.addColorStop(0, palette.skyTop)
      bgGrad.addColorStop(1, palette.skyBottom)
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Draw Stars
      ctx.save()
      stars.forEach((s) => {
        s.twinklePhase += s.twinkleSpeed
        s.alpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.35
        if (s.alpha < 0) s.alpha = 0
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`
        ctx.beginPath()
        ctx.arc(s.x + mouseRef.current.x * 0.1, s.y + mouseRef.current.y * 0.1, s.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      // Draw Shooting Star
      maybeSpawnShootingStar()
      if (shootingStar) {
        ctx.save()
        const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length
        const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length
        const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, endX, endY)
        grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`)
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.8
        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed
        shootingStar.alpha -= 0.015

        if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar = null
        }
        ctx.restore()
      }

      // Draw Aurora Curtains
      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      palette.curtains.forEach((curtain, index) => {
        const baseHeight = height * curtain.height + mouseRef.current.y * (index + 1) * 0.3
        const step = 8
        const points = []

        for (let x = -50; x <= width + 50; x += step) {
          const wave1 = Math.sin(x * curtain.freq + time * curtain.speed) * curtain.amp
          const wave2 = Math.sin(x * curtain.freq * 2.3 + time * curtain.speed * 1.5 + index) * (curtain.amp * 0.4)
          const wave3 = Math.cos(x * curtain.freq * 0.7 - time * curtain.speed * 0.8) * (curtain.amp * 0.3)
          const y = baseHeight + wave1 + wave2 + wave3 + (mouseRef.current.x * (index % 2 === 0 ? 0.2 : -0.2))

          points.push({ x, y })
        }

        const curtainGrad = ctx.createLinearGradient(0, baseHeight - curtain.amp * 3, 0, baseHeight + curtain.amp * 3.5)
        curtainGrad.addColorStop(0, curtain.color3)
        curtainGrad.addColorStop(0.35, curtain.color1)
        curtainGrad.addColorStop(0.7, curtain.color2)
        curtainGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = curtainGrad
        ctx.beginPath()
        ctx.moveTo(points[0].x, 0)
        ctx.lineTo(points[0].x, points[0].y)

        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2
          const yc = (points[i].y + points[i + 1].y) / 2
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
        }

        const last = points[points.length - 1]
        ctx.lineTo(last.x, last.y)
        ctx.lineTo(last.x, 0)
        ctx.closePath()
        ctx.fill()
      })

      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [theme])

  return (
    <div className="animated-background aurora-background">
      <canvas ref={canvasRef} className="aurora-canvas" />
      <div className="aurora-vignette" />
      <div className="aurora-grid-overlay" />
    </div>
  )
}

export default AnimatedBackground
