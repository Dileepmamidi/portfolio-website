import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Pavan | Video Editor & Motion Graphics Designer",
    template: "%s | Pavan Portfolio",
  },
  description:
    "Professional Video Editor & Motion Graphics Designer specializing in After Effects and Premiere Pro. High-quality edits for YouTube, Instagram, and brands.",
  keywords: [
    "Video Editor",
    "Motion Graphics Designer",
    "After Effects Editor",
    "Premiere Pro Editor",
    "YouTube Video Editing",
    "Freelance Video Editor",
  ],
  authors: [{ name: "Pavan" }],
  creator: "Pavan",
  metadataBase: new URL("https://pavanprotfolio.com"),
  openGraph: {
    title: "Pavan | Video Editor & Motion Graphics Designer",
    description:
      "Professional video editing and motion graphics services for creators and brands.",
    url: "https://pavanprotfolio.com",
    siteName: "Pavan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pavan Video Editor Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan | Video Editor",
    description:
      "Professional Video Editor & Motion Graphics Designer.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* 🔐 Google Search Console verification (ADD WHEN YOU GET IT) */}
        {/* 
        <meta
          name="google-site-verification"
          content="PASTE_YOUR_CODE_HERE"
        />
        */}
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
