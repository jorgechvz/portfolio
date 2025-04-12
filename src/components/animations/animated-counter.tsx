import { useState, useEffect, useRef, memo } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
}

const AnimatedCounter = memo(function AnimatedCounter({ from, to, duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = Math.floor(progress * (to - from) + from)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setHasAnimated(true)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration, isInView, hasAnimated])

  return <span ref={ref}>{count}</span>
})

export default AnimatedCounter
