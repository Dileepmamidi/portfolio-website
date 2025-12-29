"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

type Skill = {
  name: string
  percentage: number
}

type AboutData = {
  name: string
  role: string
  bio: string
  experience: number
  profileImage: string
  tools: string[]
  skills: Skill[]
}

export function AboutSection() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAbout() {
      const ref = doc(db, "about", "main")
      const snap = await getDoc(ref)

      if (snap.exists()) {
        setAbout(snap.data() as AboutData)
      }

      setLoading(false)
    }

    loadAbout()
  }, [])

  if (loading) {
    return (
      <section className="px-4 py-24 text-center text-gray-400">
        Loading about section...
      </section>
    )
  }

  if (!about) return null

  return (
    <section id="about" className="px-4 py-24 bg-black">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">

        {/* LEFT: IMAGE */}
        <div className="relative">
          <Image
            src={about.profileImage}
            alt={about.name}
            width={600}
            height={600}
            className="rounded-2xl object-cover"
          />

          {/* Experience badge */}
          <div className="absolute top-6 right-6 bg-white text-black rounded-xl px-6 py-4 text-center font-bold">
            <div className="text-3xl">{about.experience}+</div>
            <div className="text-sm tracking-wide">YEARS EXPERIENCE</div>
          </div>
        </div>

        {/* RIGHT: CONTENT */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-4"
          >
            About Me
          </motion.h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            {about.bio}
          </p>

          {/* TOOLS */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {about.tools.map((tool, index) => (
              <div
                key={`${tool}-${index}`}
                className="rounded-xl border border-white/10 bg-[#0f0f0f] p-4 text-center text-gray-300"
              >
                {tool}
              </div>
            ))}
          </div>

          {/* SKILLS */}
          <div className="space-y-4">
            {about.skills.map((skill, index) => (
              <div key={`${skill.name}-${index}`}>
                <div className="flex justify-between mb-1 text-sm text-gray-300">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>

                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
