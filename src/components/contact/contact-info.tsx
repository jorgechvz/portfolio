import type React from "react"

import { motion } from "framer-motion"

interface ContactInfoProps {
  icon: React.ReactNode
  title: string
  value: string
  link: string
}

export default function ContactInfo({ icon, title, value, link }: ContactInfoProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center group"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-slate-900 dark:text-white font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {value}
        </p>
      </div>
    </motion.a>
  )
}
