"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export type Project = {
  title: string
  description: string
  tools: string[]
  videoUrl: string
}

interface VideoModalProps {
  project: Project | null
  onClose: () => void
}

/**
 * Detects video type and returns embed URL if needed
 */
function getEmbedUrl(url: string) {
  // YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id =
      url.includes("youtu.be")
        ? url.split("/").pop()
        : new URL(url).searchParams.get("v")

    return `https://www.youtube.com/embed/${id}?autoplay=1`
  }

  // Vimeo
  if (url.includes("vimeo.com")) {
    const id = url.split("/").pop()
    return `https://player.vimeo.com/video/${id}?autoplay=1`
  }

  // Direct video (mp4, webm, etc.)
  return null
}

export function VideoModal({ project, onClose }: VideoModalProps) {
  if (!project) return null

  const embedUrl = getEmbedUrl(project.videoUrl)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Video */}
          <div className="relative aspect-video bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            )}
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="mb-2 text-2xl font-bold text-white">
              {project.title}
            </h3>

            <p className="mb-4 text-gray-400">
              {project.description}
            </p>

            {project.tools?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md bg-white/10 px-3 py-1 text-sm text-white"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
