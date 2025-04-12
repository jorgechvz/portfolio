import { motion, type MotionValue, useTransform } from "framer-motion"

interface NavigationIndicatorProps {
  scrollProgress: MotionValue<number>
}

export default function NavigationIndicator({ scrollProgress }: NavigationIndicatorProps) {
  // Transform scroll progress to height percentage
  const height = useTransform(scrollProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="h-48 w-1 bg-slate-200 dark:bg-slate-800 rounded-full relative">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-purple-600 to-indigo-600 rounded-full"
          style={{ height }}
        />

        <motion.div
          className="absolute w-3 h-3 bg-white dark:bg-slate-900 rounded-full left-1/2 -translate-x-1/2 border-2 border-purple-600 shadow-md"
          style={{ top: height }}
        />
      </div>
    </div>
  )
}
