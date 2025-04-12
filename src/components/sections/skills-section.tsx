import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Brain, Code, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState("ai");

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  // Skill categories with modern UI
  const skillCategories = {
    ai: {
      title: "Artificial Intelligence",
      icon: <Brain className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500",
      description:
        "Building intelligent systems that can learn, adapt, and solve complex problems.",
      skills: [
        {
          name: "Machine Learning",
          level: "Expert",
          description: "Regression, classification, clustering algorithms",
        },
        {
          name: "Deep Learning",
          level: "Advanced",
          description: "Neural networks, CNN, RNN, transformers",
        },
        {
          name: "NLP",
          level: "Advanced",
          description: "Text processing, sentiment analysis, language models",
        },
        {
          name: "Computer Vision",
          level: "Advanced",
          description: "Image recognition, object detection, segmentation",
        },
        {
          name: "Reinforcement Learning",
          level: "Intermediate",
          description: "Q-learning, policy gradients, DDPG",
        },
      ],
      tools: [
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Keras",
        "NLTK",
        "OpenCV",
        "Hugging Face",
      ],
      image: "/placeholder.svg?height=400&width=400",
    },
    frontend: {
      title: "Frontend Development",
      icon: <Code className="h-6 w-6" />,
      color: "from-indigo-500 to-blue-500",
      description:
        "Creating responsive, interactive, and user-friendly web interfaces.",
      skills: [
        {
          name: "React/Next.js",
          level: "Expert",
          description: "Component-based architecture, server components",
        },
        {
          name: "TypeScript",
          level: "Advanced",
          description: "Type safety, interfaces, generics",
        },
        {
          name: "UI/UX Design",
          level: "Advanced",
          description: "Wireframing, prototyping, user testing",
        },
        {
          name: "CSS/Tailwind",
          level: "Expert",
          description: "Responsive design, animations, custom themes",
        },
        {
          name: "State Management",
          level: "Advanced",
          description: "Redux, Context API, Zustand",
        },
      ],
      tools: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Figma",
        "Storybook",
      ],
      image: "/placeholder.svg?height=400&width=400",
    },
    backend: {
      title: "Backend Development",
      icon: <Database className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      description:
        "Building robust, scalable, and secure server-side applications.",
      skills: [
        {
          name: "Node.js",
          level: "Advanced",
          description: "Express, RESTful APIs, middleware",
        },
        {
          name: "Python",
          level: "Expert",
          description: "FastAPI, Django, Flask",
        },
        {
          name: "Databases",
          level: "Advanced",
          description: "SQL, NoSQL, data modeling, optimization",
        },
        {
          name: "API Design",
          level: "Advanced",
          description: "REST, GraphQL, WebSockets",
        },
        {
          name: "Cloud Services",
          level: "Advanced",
          description: "AWS, GCP, serverless architecture",
        },
      ],
      tools: [
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Docker",
        "Kubernetes",
      ],
      image: "/placeholder.svg?height=400&width=400",
    },
  };

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "text-green-600 dark:text-green-400";
      case "Advanced":
        return "text-blue-600 dark:text-blue-400";
      case "Intermediate":
        return "text-yellow-600 dark:text-yellow-400";
      case "Beginner":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Tab animation variants
  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: 0, scale: 1.05 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-20 md:py-32 bg-slate-50/50 dark:bg-slate-900/50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div style={{ opacity, scale }} className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Skills &{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </motion.h2>

          <motion.p
            className="text-slate-700 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Combining advanced technical knowledge with creativity to develop
            innovative solutions that leverage the power of artificial
            intelligence and software development.
          </motion.p>
        </motion.div>

        {/* Modern tabbed skills interface */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-purple-500/5 border border-purple-100 dark:border-purple-900/20 overflow-hidden">
          {/* Tab navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                className={cn(
                  "flex-1 py-4 px-4 flex flex-col items-center justify-center transition-colors",
                  activeTab === key
                    ? "bg-slate-50 dark:bg-slate-800"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
                onClick={() => setActiveTab(key)}
                variants={tabVariants}
                initial="inactive"
                animate={activeTab === key ? "active" : "inactive"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={cn(
                    "p-3 rounded-lg mb-2 bg-gradient-to-r",
                    category.color,
                    activeTab === key ? "opacity-100" : "opacity-70"
                  )}
                >
                  <div className="text-white">{category.icon}</div>
                </div>
                <span
                  className={cn(
                    "font-medium",
                    activeTab === key
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {category.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8">
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.div
                key={key}
                className={cn(
                  "space-y-8",
                  activeTab === key ? "block" : "hidden"
                )}
                variants={contentVariants}
                initial="hidden"
                animate={activeTab === key ? "visible" : "hidden"}
              >
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-3 space-y-6">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <h3 className="text-2xl font-bold">{category.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {category.description}
                      </p>
                    </motion.div>

                    {/* Skills list */}
                    <div className="space-y-4">
                      {category.skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium">{skill.name}</h4>
                            <span
                              className={cn(
                                "text-sm font-medium",
                                getLevelColor(skill.level)
                              )}
                            >
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {skill.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tools and technologies */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        Tools & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.tools.map((tool, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Illustration */}
                  <motion.div
                    variants={itemVariants}
                    className="md:col-span-2 flex justify-center"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className="relative w-full max-w-xs aspect-square">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        width={400}
                        height={400}
                        className="rounded-xl object-cover"
                      />
                      <div
                        className={cn(
                          "absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br",
                          category.color
                        )}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
