"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ProjectCard } from "./project-card"
import { VideoModal } from "./video-modal"

export type Project = {
  title: string
  description: string
  tools: string[]
  videoUrl: string
  thumbnailUrl?: string
  order: number
  published: boolean
}

export function PortfolioGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      const q = query(
        collection(db, "projects"),
        where("published", "==", true),
        orderBy("order", "asc")
      )

      const snap = await getDocs(q)
      const data = snap.docs.map(doc => doc.data() as Project)

      setProjects(data)
      setLoading(false)
    }

    loadProjects()
  }, [])

  return (
    <section id="portfolio" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-white text-5xl sm:text-6xl tracking-tight text-balance">
            Portfolio
          </h2>
          <p className="text-xl text-gray-400 text-pretty">
            A showcase of recent projects across different platforms and styles
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading projects...</p>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5">
            See Full Portfolio
          </button>
        </motion.div>
      </div>

      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
