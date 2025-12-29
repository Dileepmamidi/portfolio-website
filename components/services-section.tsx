"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Scissors, Sparkles, Video } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

/**
 * Map icon names stored in Firestore
 * to actual React icon components
 */
const iconMap: Record<string, any> = {
  scissors: Scissors,
  sparkles: Sparkles,
  video: Video,
}

type Service = {
  title: string
  description: string
  features: string[]
  icon: string
  order: number
}

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      const q = query(
        collection(db, "services"),
        orderBy("order", "asc")
      )

      const snap = await getDocs(q)
      const data = snap.docs.map(doc => doc.data() as Service)

      setServices(data)
      setLoading(false)
    }

    loadServices()
  }, [])

  if (loading) {
    return (
      <section className="px-4 py-24 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl text-center text-gray-400">
          Loading services...
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="px-4 py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-white text-5xl sm:text-6xl tracking-tight">
            Services
          </h2>
          <p className="text-xl text-gray-400">
            Comprehensive video production services tailored to your needs
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]

            return (
              <motion.div
                key={`${service.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 transition-all hover:border-white/20"
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-white/5 text-white">
                  {Icon && <Icon className="h-8 w-8" />}
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mb-6 text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features?.map((feature, featureIndex) => (
                    <li
                      key={`${feature}-${featureIndex}`}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
