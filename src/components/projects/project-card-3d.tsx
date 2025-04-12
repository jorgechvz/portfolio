import type React from "react";

import { useState, useRef, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectCard3DProps {
  project: Project;
}

const ProjectCard3D = memo(function ProjectCard3D({
  project,
}: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig
  );
  const scale = useSpring(isHovered ? 1.05 : 1, springConfig);

  // Handle mouse move on card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg shadow-purple-500/5 border border-purple-100 dark:border-purple-900/20 cursor-pointer perspective-1000"
      style={{
        scale,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      {/* Card content */}
      <div className="h-full flex flex-col">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            style={{
              scale: isHovered ? 1.1 : 1,
              transition: "scale 0.4s ease-out",
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Action buttons on hover */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="sm"
              className="bg-white text-slate-800 hover:bg-slate-100 flex items-center gap-1 flex-1"
              asChild
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3 w-3" />
                Demo
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/20 flex items-center gap-1 flex-1"
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-3 w-3" />
                Code
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* 3D effect highlight */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          background: isHovered
            ? `radial-gradient(circle at ${
                mouseX.get() * 100 + 50
              }% 0%, rgba(124, 58, 237, 0.1) 0%, rgba(255, 255, 255, 0) 50%)`
            : "none",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

export default ProjectCard3D;
