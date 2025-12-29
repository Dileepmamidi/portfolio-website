"use client"

import { motion } from "framer-motion"
import { MessageSquare, Edit3, Eye, CheckCircle } from "lucide-react"

const processSteps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Brief",
    description: "Share your vision, goals, and raw footage. We discuss style, tone, and target audience.",
  },
  {
    number: "02",
    icon: Edit3,
    title: "Edit",
    description: "I craft your video with precision—cutting, color grading, adding effects and motion graphics.",
  },
  {
    number: "03",
    icon: Eye,
    title: "Review",
    description: "You review the draft and provide feedback. We refine until it's exactly what you need.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Deliver",
    description: "Final video delivered in your preferred format, ready to publish and make an impact.",
  },
]

export function ProcessSection() {
  return (
    <section className="px-4 py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-white text-5xl sm:text-6xl tracking-tight text-balance">My Process</h2>
          <p className="text-xl text-gray-400 text-pretty">
            A streamlined workflow to ensure quality results and clear communication
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] p-8"
            >
              {/* Large number background */}
              <div className="absolute right-4 top-4 text-8xl font-bold text-white/5">{step.number}</div>

              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-white">
                  <step.icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
