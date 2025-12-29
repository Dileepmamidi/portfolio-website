"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "YouTube Creator",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Absolutely phenomenal work! My channel grew 300% after working together. The edits are always perfectly timed and the motion graphics add so much value.",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Professional, fast, and incredibly creative. Our brand videos have never looked better. Highly recommend for any business looking to elevate their content.",
  },
  {
    name: "Emily Rodriguez",
    role: "Instagram Influencer",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "My Reels are getting 10x more engagement! The cuts are snappy, the colors pop, and everything feels so polished. Worth every penny.",
  },
]

export function TestimonialsSection() {
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
          <h2 className="mb-4 font-bold text-white text-5xl sm:text-6xl tracking-tight text-balance">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-400 text-pretty">Trusted by creators and brands worldwide</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-black p-8"
            >
              {/* Star rating */}
              <div className="mb-6 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="mb-8 text-gray-300 leading-relaxed italic">"{testimonial.text}"</p>

              {/* Client info */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full bg-white/10"
                />
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
