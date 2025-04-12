import { useRef, useState, useEffect, memo } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import ParticleField from "@/components/canvas/particle-field"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

const CanvasExperience = memo(function CanvasExperience() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  // Mouse movement for interactive background
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 100 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to viewport
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 w-full h-full z-0 overflow-hidden transition-colors duration-700",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Gradient background that moves with mouse */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(124, 58, 237, 0.2), rgba(255, 255, 255, 0))`,
          y: parallaxY,
        }}
      />

      {/* Interactive particle field */}
      <ParticleField
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        isHovering={isHovering}
        isMobile={isMobile}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className={cn(
            "absolute top-[20%] left-[10%] w-64 h-64 rounded-full blur-3xl opacity-20",
          )}
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        />
        <motion.div
          className={cn(
            "absolute bottom-[30%] right-[15%] w-96 h-96 rounded-full blur-3xl opacity-20",
          )}
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
        />
      </div>
    </div>
  )
})

export default CanvasExperience
