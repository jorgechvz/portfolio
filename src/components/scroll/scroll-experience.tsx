import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import HeroSection from "@/components/sections/hero-section"
import ProjectsSection from "@/components/sections/projects-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ContactSection from "@/components/sections/contact-section"
import NavigationIndicator from "../navigation/navigation-indicator"

export default function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Scroll indicator */}
      <NavigationIndicator scrollProgress={scrollYProgress} />

      {/* Background decorative elements with parallax */}
      <motion.div className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ y: backgroundY }}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-300/10 to-indigo-300/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-300/10 to-purple-300/10 blur-3xl" />
      </motion.div>

      {/* Content sections - Projects now come right after Hero */}
      <div className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </div>
  )
}
