"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const techIcons: Record<string, string> = {}

interface TechBadgeProps {
  tech: string
  size?: "sm" | "md"
  showIcon?: boolean
}

export function TechBadge({ tech, size = "sm", showIcon = true }: TechBadgeProps) {
  const iconUrl = techIcons[tech]
  const hasIcon = showIcon && iconUrl

  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1.5",
    md: "px-3 py-1.5 text-sm gap-2"
  }

  return (
    <motion.span
      className={`inline-flex items-center rounded-full bg-primary/10 text-primary font-mono ${sizeClasses[size]}`}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(100, 255, 218, 0.2)" }}
      transition={{ duration: 0.2 }}
    >
      {hasIcon && (
        <Image
          src={iconUrl}
          alt={tech}
          width={size === "sm" ? 14 : 18}
          height={size === "sm" ? 14 : 18}
          className="object-contain"
          unoptimized
        />
      )}
      {tech}
    </motion.span>
  )
}

interface MetricChipProps {
  metric: string
}

export function MetricChip({ metric }: MetricChipProps) {
  return (
    <motion.span
      className="inline-flex items-center px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {metric}
    </motion.span>
  )
}
