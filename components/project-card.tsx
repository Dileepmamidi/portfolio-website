"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

/**
 * SINGLE SOURCE OF TRUTH FOR PROJECT TYPE
 * (matches Firestore)
 */
export type Project = {
  title: string
  description: string
  tools: string[]
  videoUrl: string
  thumbnailUrl?: string
}

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#0f0f0f] shadow-lg ring-1 ring-white/10 transition-all hover:ring-white/20"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* VIDEO PREVIEW (on hover) */}
        {isHovered && project.videoUrl ? (
          <video
            src={project.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={project.thumbnailUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Play button */}
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-xl">
              <Play className="h-8 w-8 fill-white text-white" />
            </div>
          </motion.div>
        )}

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}
