"use client"

import { motion } from "framer-motion"
import { ExternalLink, Mail, MessageCircle } from "lucide-react"

const contactMethods = [
  {
    icon: ExternalLink,
    title: "Fiverr",
    description: "Hire me on Fiverr",
    link: "https://www.fiverr.com",
  },
  {
    icon: Mail,
    title: "Email",
    description: "your.email@example.com",
    link: "mailto:your.email@example.com",
  },
  {
    icon: MessageCircle,
    title: "Direct Message",
    description: "Quick response",
    link: "#",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="mb-6 font-bold text-white text-5xl sm:text-6xl tracking-tight text-balance">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-gray-400 text-pretty">
            Ready to elevate your content? Get in touch and let's discuss how I can help bring your vision to life.
          </p>
        </motion.div>

        {/* Contact methods */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 transition-all hover:border-white/20 hover:bg-white/5"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-white/5 text-white transition-colors group-hover:bg-white/10">
                <method.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{method.title}</h3>
              <p className="text-sm text-gray-400">{method.description}</p>
            </motion.a>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://www.fiverr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-black transition-all hover:scale-105"
          >
            Hire Me on Fiverr
          </a>
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </section>
  )
}
