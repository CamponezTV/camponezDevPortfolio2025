import type { Language } from "@/config/translations"
import { homeStructuredData } from "@/lib/structured-data"
import { AboutSection } from "../about-section"
import { ContactSection } from "../contact-section"
import { Footer } from "../footer"
import { GallerySection } from "../gallery-section"
import { HeroSection } from "../hero-section"
import { JsonLd } from "../json-ld"
import { Navigation } from "../navigation"
import { ProjectsSection } from "../projects-section"
import { SkillsSection } from "../skills-section"

export function HomePage({ language }: { language: Language }) {
  return (
    <>
      <JsonLd data={homeStructuredData(language)} />
      <Navigation />
      <main className="relative w-full overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
