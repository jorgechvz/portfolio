import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  duration?: number;
}

const AnimatedText = memo(function AnimatedText({
  text,
  delay = 0.1,
  duration = 0.05,
}: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span>{text}</span>;

  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

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
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
});

export default AnimatedText;
