import { useRef, useEffect, memo } from "react"
import type { MotionValue } from "framer-motion"

interface ParticleFieldProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  isHovering: boolean
  isMobile: boolean
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
  originalAlpha: number
}

const ParticleField = memo(function ParticleField({
  mouseX,
  mouseY,
  isHovering,
  isMobile,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const requestRef = useRef<number | null>(null)

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particleCount = isMobile ? 50 : 150
    particles.current = []

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1
      const alpha = Math.random() * 0.5 + 0.1

      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: "#ffffff",
        alpha,
        originalAlpha: alpha,
      })
    }

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isMobile])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let mouseXValue = 0.5
    let mouseYValue = 0.5

    const unsubscribeX = mouseX.onChange((latest) => {
      mouseXValue = latest
    })

    const unsubscribeY = mouseY.onChange((latest) => {
      mouseYValue = latest
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width

        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        // Mouse interaction
        if (isHovering) {
          const dx = particle.x - mouseXValue * canvas.width
          const dy = particle.y - mouseYValue * canvas.height
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.2
            particle.x += dx * force
            particle.y += dy * force
            particle.alpha = particle.originalAlpha * 2
          } else {
            particle.alpha = particle.originalAlpha
          }
        } else {
          particle.alpha = particle.originalAlpha
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.alpha
        ctx.fill()
      })

      // Draw connections
      ctx.beginPath()
      ctx.strokeStyle = "rgba(99, 102, 241, 0.05)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x
          const dy = particles.current[i].y - particles.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.globalAlpha = (1 - distance / 100) * 0.2
            ctx.moveTo(particles.current[i].x, particles.current[i].y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
          }
        }
      }

      ctx.stroke()
      ctx.globalAlpha = 1

      requestRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      unsubscribeX()
      unsubscribeY()
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [mouseX, mouseY, isHovering])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
})

export default ParticleField
