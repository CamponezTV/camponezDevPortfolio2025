"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { useAnimationContext } from "./animation-context"
import { ProjectsCatalog } from "./projects-catalog"

export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  // Bloquear scroll quando catalog está aberto
  useEffect(() => {
    if (catalogOpen) {
      document.documentElement.style.overflow = 'hidden'
      return () => {
        document.documentElement.style.overflow = ''
      }
    }
  }, [catalogOpen])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const projects = t.projects.items.map((item, i) => ({
    id: i + 1,
    title: item.title,
    category: item.category,
    description: item.description,
    image: [
      "/Xmetal.png",
      "/vendeai-logo.svg",
      "/banestes.png",
      "/novasyn.png",
      "/portfolio-2024.png",
      "",
    ][i],
    tags: item.tags,
    link: [
      "https://xmetal.novasyn.com.br/",
      "https://novasyn.com.br/#portfolio",
      "https://www.banestesasset.com.br/",
      "https://novasyn.com.br",
      "https://my-portfolio-six-kappa-14.vercel.app/",
      "",
    ][i],
    github: [
      "",
      "",
      "",
      "https://github.com/CamponezTV/NovaSyn-LTDA",
      "https://github.com/CamponezTV/my-portfolio",
      "https://github.com/CamponezTV/camponezDevPortfolio2025",
    ][i],
  }))

  return (
    <section ref={containerRef} id="projects" className="relative py-32 md:py-48 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">{t.projects.title}</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-4">
              {t.projects.heading.split(" ").slice(0, 1).join(" ")} <span className="text-gradient">{t.projects.heading.split(" ").slice(1).join(" ")}</span>
            </h2>
          </div>
          <motion.button
            onClick={() => setCatalogOpen(true)}
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors group cursor-pointer"
          >
            {t.projects.viewMore}
            <ArrowUpRight
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              size={20}
            />
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 p-4 md:p-6 rounded-lg bg-primary/5 border border-primary/20 mb-8 space-y-3"
          >
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              {t.projects.disclaimer.title}
            </h3>
            
            <p className="text-sm text-muted-foreground">
              {t.projects.disclaimer.intro}
            </p>
            
            <ul className="space-y-2 ml-4">
              {t.projects.disclaimer.reasons.map((reason, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-3">
                  <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-primary/20 text-primary font-semibold text-xs">
                    {i + 1}
                  </span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Projects */}
          {projects.slice(0, 4).map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                setSelectedProjectId(project.id)
                setCatalogOpen(true)
              }}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === project.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                  animate={{ opacity: hoveredId === project.id ? 1 : 0.7 }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <motion.span
                    className="text-primary text-sm font-medium mb-2"
                    animate={{ y: hoveredId === project.id ? 0 : 10, opacity: hoveredId === project.id ? 1 : 0.7 }}
                  >
                    {project.category}
                  </motion.span>

                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-foreground mb-3"
                    animate={{ y: hoveredId === project.id ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0, y: hoveredId === project.id ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0.5 }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Links */}
                  <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0, y: hoveredId === project.id ? 0 : 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.link && (
                      <a
                        href={project.link}
                        className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink size={16} />
                        {t.projects.viewProject}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <Github size={16} />
                        {t.projects.code}
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Corner Decoration */}
                <motion.div
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center"
                  animate={{
                    scale: hoveredId === project.id ? 1 : 0.8,
                    opacity: hoveredId === project.id ? 1 : 0.5,
                  }}
                >
                  <ArrowUpRight size={20} className="text-primary" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Projects Catalog Modal */}
      <ProjectsCatalog 
        isOpen={catalogOpen} 
        onClose={() => {
          setCatalogOpen(false)
          setSelectedProjectId(null)
        }}
        selectedProjectId={selectedProjectId}
      />
    </section>
  )
}
