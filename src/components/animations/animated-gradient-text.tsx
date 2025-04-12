import { useEffect, useState, memo } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientTextProps {
  text: string
}

const AnimatedGradientText = memo(function AnimatedGradientText({ text }: AnimatedGradientTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <span>{text}</span>

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div className="inline-block" variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
})

export default AnimatedGradientText
