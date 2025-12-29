"use client"

import { Instagram, Youtube, Twitter, Linkedin } from "lucide-react"

const socialLinks = [
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-xl font-bold text-white">Video Editor & Motion Designer</h3>
            <p className="text-sm text-gray-400">Crafting visual stories since 2019</p>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
