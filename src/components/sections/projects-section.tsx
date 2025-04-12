import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectCard3D from "@/components/projects/project-card-3d";
import { cn } from "@/lib/utils";

// Project data
const projects = [
  {
    id: 1,
    title: "AI Vision Analytics",
    description:
      "Image analysis platform with computer vision to detect patterns and anomalies in real-time.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Computer Vision", "TensorFlow", "React", "Python"],
    demoUrl: "#projects",
    githubUrl: "#projects",
    featured: true,
  },
  {
    id: 2,
    title: "NLP Sentiment Engine",
    description:
      "NLP-based sentiment analysis engine for processing large volumes of text and extracting insights.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["NLP", "BERT", "FastAPI", "MongoDB"],
    demoUrl: "#projects",
    githubUrl: "#projects",
    featured: true,
  },
  {
    id: 3,
    title: "Smart IoT Dashboard",
    description:
      "Interactive dashboard for monitoring and controlling IoT devices with predictive analytics.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["IoT", "React", "Node.js", "MQTT"],
    demoUrl: "#projects",
    githubUrl: "#projects",
    featured: true,
  },
  {
    id: 4,
    title: "Reinforcement Learning Game AI",
    description:
      "AI agent trained with reinforcement learning to play and master complex games.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["RL", "PyTorch", "Python", "OpenAI Gym"],
    demoUrl: "#projects",
    githubUrl: "#projects",
    featured: false,
  },
  {
    id: 5,
    title: "Blockchain Data Analytics",
    description:
      "Platform for analyzing and visualizing blockchain data with machine learning.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Blockchain", "ML", "D3.js", "Node.js"],
    demoUrl: "#projects",
    githubUrl: "#projects",
    featured: false,
  },
  {
    id: 6,
    title: "Autonomous Drone Navigation",
    description:
      "Autonomous navigation system for drones using computer vision and deep learning.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Drones", "Computer Vision", "ROS", "C++"],
    demoUrl: "#projects",
    githubUrl: "#projects",
    featured: false,
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const featuredProjects = projects.filter((project) => project.featured);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  // Handle carousel navigation
  const nextProject = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

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
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div style={{ opacity, y }} className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>

          <motion.p
            className="text-slate-700 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A selection of innovative projects showcasing my expertise in
            artificial intelligence, web development, and emerging technologies.
          </motion.p>
        </motion.div>

        {/* Featured projects carousel */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-purple-500/10 border border-purple-100 dark:border-purple-900/20 bg-white dark:bg-slate-800 aspect-[16/9] max-w-5xl mx-auto">
            {/* Navigation arrows */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6 text-slate-700 dark:text-slate-200" />
            </button>

            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6 text-slate-700 dark:text-slate-200" />
            </button>

            {/* Project carousel */}
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <div className="grid md:grid-cols-2 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        featuredProjects[activeIndex].image ||
                        "/placeholder.svg"
                      }
                      alt={featuredProjects[activeIndex].title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/40 md:to-transparent" />
                  </div>

                  <div className="relative p-6 md:p-10 flex flex-col justify-center bg-white dark:bg-slate-800 md:bg-transparent md:dark:bg-transparent">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 md:text-white dark:text-white">
                        {featuredProjects[activeIndex].title}
                      </h3>

                      <p className="text-slate-700 dark:text-slate-300 md:text-slate-200 mb-6">
                        {featuredProjects[activeIndex].description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {featuredProjects[activeIndex].tags.map(
                          (tag, index) => (
                            <Badge
                              key={index}
                              className="bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50"
                            >
                              {tag}
                            </Badge>
                          )
                        )}
                      </div>

                      <div className="flex gap-4">
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                          asChild
                        >
                          <a
                            href={featuredProjects[activeIndex].demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Demo
                          </a>
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20 flex items-center gap-2"
                          asChild
                        >
                          <a
                            href={featuredProjects[activeIndex].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            View Code
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "bg-purple-600 w-6"
                      : "bg-slate-400 dark:bg-slate-600 hover:bg-slate-700"
                  )}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Other projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects
            .filter((project) => !project.featured)
            .map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard3D project={project} />
              </motion.div>
            ))}
        </motion.div>

        {/* View all projects button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
