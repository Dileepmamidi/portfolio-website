"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="mb-6 font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tight text-balance">
            Professional Video Editor &<br />
            Motion Graphics Designer
          </h1>
          <p className="mx-auto mb-12 max-w-4xl text-lg sm:text-xl text-gray-400 leading-relaxed text-pretty">
            Transforming ideas into captivating visual stories for YouTube, Instagram, brands, and beyond. Specializing
            in cinematic edits and dynamic motion graphics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={scrollToPortfolio}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-white px-8 py-4 text-lg font-semibold text-black shadow-lg transition-all hover:scale-105"
          >
            <span className="relative z-10">View Work</span>
          </button>

          <button
            onClick={scrollToContact}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-white hover:text-black"
          >
            <span className="relative z-10">Hire Me</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
