import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioGrid />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}
