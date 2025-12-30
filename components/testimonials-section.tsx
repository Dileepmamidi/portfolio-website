"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

type Testimonial = {
  name: string
  role: string
  message: string
  avatar?: string
  rating: number
  order: number
  published: boolean
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      const q = query(
        collection(db, "testimonials"),
        where("published", "==", true),
        orderBy("order", "asc")
      )

      const snap = await getDocs(q)
      const data = snap.docs.map(doc => doc.data() as Testimonial)

      setTestimonials(data)
      setLoading(false)
    }

    loadTestimonials()
  }, [])

  if (loading) {
    return (
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl text-center text-gray-400">
          Loading testimonials...
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-white text-5xl sm:text-6xl tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-400">
            Trusted by creators and brands worldwide
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={`${t.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-black p-8"
            >
              {/* Star rating */}
              <div className="mb-6 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Message */}
              <p className="mb-8 text-gray-300 leading-relaxed italic">
                "{t.message}"
              </p>

              {/* Client info */}
              <div className="flex items-center gap-4">
                <Image
                  src={t.avatar || "/placeholder.svg"}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full bg-white/10"
                />
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
