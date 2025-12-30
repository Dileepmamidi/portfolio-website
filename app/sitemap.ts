import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://portfolio-website-murex-mu-10.vercel.app",
      lastModified: new Date(),
    },
  ]
}
