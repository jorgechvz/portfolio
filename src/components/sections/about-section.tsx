import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import AnimatedCounter from "@/components/animations/animated-counter";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.1, 0.4], ["20%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Stats data
  const stats = [
    { value: 7, label: "Years of Experience" },
    { value: 50, label: "Completed Projects" },
    { value: 20, label: "Satisfied Clients" },
    { value: 15, label: "Technologies Mastered" },
  ];

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image with animated container */}
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="relative"
          >
            <motion.div
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-purple-100 dark:border-purple-900"
              initial={{ opacity: 0, rotateY: 30 }}
              animate={
                isInView
                  ? { opacity: 1, rotateY: 0 }
                  : { opacity: 0, rotateY: 30 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="aspect-square relative">
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Profile"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-purple-600 rounded-full opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-600 rounded-full opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>

            {/* Experience badge */}
            <motion.div
              className="absolute top-5 -right-4 md:-right-10 z-20 bg-white dark:bg-slate-900 rounded-xl px-4 py-3 shadow-lg border border-purple-100 dark:border-purple-900"
              initial={{ opacity: 0, y: 20, rotate: 5 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotate: 0 }
                  : { opacity: 0, y: 20, rotate: 5 }
              }
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Specialist in
              </p>
              <p className="text-base font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Machine Learning & AI
              </p>
            </motion.div>

            {/* Tech stack badge */}
            <motion.div
              className="absolute -bottom-4 -left-4 md:-left-10 z-20 bg-white dark:bg-slate-900 rounded-xl px-4 py-3 shadow-lg border border-purple-100 dark:border-purple-900"
              initial={{ opacity: 0, y: -20, rotate: -5 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotate: 0 }
                  : { opacity: 0, y: -20, rotate: -5 }
              }
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Tech Stack
              </p>
              <p className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Python • React • TensorFlow
              </p>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            style={{ x: textX, opacity: textOpacity }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transforming ideas into{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  intelligent solutions
                </span>
              </h2>

              <p className="text-slate-700 dark:text-slate-300 mb-6">
                I'm an engineer specialized in artificial intelligence and
                software development with over 7 years of experience creating
                innovative solutions that solve complex problems and enhance
                user experience.
              </p>

              <p className="text-slate-700 dark:text-slate-300 mb-8">
                My passion is combining advanced machine learning algorithms
                with intuitive interfaces to create products that are not only
                technically sound but also accessible and useful for people.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-slate-800/50 rounded-lg p-4 text-center shadow-sm border border-slate-100 dark:border-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter from={0} to={stat.value} duration={2} />
                      {index === 0
                        ? "+"
                        : index === 1
                        ? "+"
                        : index === 2
                        ? "+"
                        : "+"}
                    </div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Download CV
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 flex items-center gap-2"
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
