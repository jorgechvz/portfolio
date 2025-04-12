import { motion } from "framer-motion"

export default function LoadingExperience() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-50">
      <div className="text-center">
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-t-purple-600 border-r-indigo-600 border-b-purple-600 border-l-indigo-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading Experience
        </motion.h2>

        <motion.p
          className="text-slate-600 dark:text-slate-400 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Preparing an immersive experience...
        </motion.p>
      </div>
    </div>
  )
}
