import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedText from "@/components/animations/animated-text"
import AnimatedGradientText from "@/components/animations/animated-gradient-text"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"])

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  }

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="container px-4 md:px-6 z-10 text-center" style={{ opacity, scale, y }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="mb-4 text-sm md:text-base font-medium text-purple-600 dark:text-purple-400"
          >
            <AnimatedText text="INNOVATION • CREATIVITY • TECHNOLOGY" />
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold mb-6">
            <AnimatedGradientText text={isMobile ? "AI & Software Engineer" : "AI & Software Engineer"} />
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8"
          >
            Creating digital experiences at the intersection of
            <span className="text-purple-600 dark:text-purple-400"> artificial intelligence </span>and
            <span className="text-indigo-600 dark:text-indigo-400"> software development</span>.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50"
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        onClick={() => scrollToSection("projects")}
      >
        <ArrowDown className="h-8 w-8 text-purple-600 dark:text-purple-400" />
      </motion.div>
    </section>
  )
}
