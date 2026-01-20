"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft, Github, ExternalLink, Target, Lightbulb, Zap, Users, Calendar, GraduationCap } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

type ProjectDetails = {
  challenge: string
  solution: string
  results: string
  timeline: string
  team: string
  learnings: string
}

type Project = {
  id: number
  title: string
  category: string
  description: string
  image: string
  tags: readonly string[]
  link: string
  github: string
  details?: ProjectDetails
}

interface ProjectsCatalogProps {
  isOpen: boolean
  onClose: () => void
  selectedProjectId?: number | null
}

export function ProjectsCatalog({ isOpen, onClose, selectedProjectId }: ProjectsCatalogProps) {
  const t = useTranslations()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const projects = t.projects.items.map((item: any, i: number) => ({
    id: i + 1,
    title: item.title,
    category: item.category,
    description: item.description,
    image: [
      "/Xmetal.png",
      "/vendeai-logo.svg",
      "/banestes.png",
      "/novasyn.png",
    ][i],
    tags: item.tags,
    link: [
      "https://xmetal.novasyn.com.br/",
      "https://novasyn.com.br/#portfolio",
      "https://www.banestesasset.com.br/",
      "https://novasyn.com.br",
    ][i],
    github: [
      "",
      "",
      "",
      "https://github.com/CamponezTV/NovaSyn-LTDA",
    ][i],
    details: item.details,
  }))

  // Initialize selected project when modal opens with selectedProjectId
  useEffect(() => {
    if (isOpen && selectedProjectId) {
      const projectsArray = t.projects.items.map((item: any, i: number) => ({
        id: i + 1,
        title: item.title,
        category: item.category,
        description: item.description,
        image: [
          "/Xmetal.png",
          "/vendeai-logo.svg",
          "/banestes.png",
          "/novasyn.png",
        ][i],
        tags: item.tags,
        link: [
          "https://xmetal.novasyn.com.br/",
          "https://novasyn.com.br/#portfolio",
          "https://www.banestesasset.com.br/",
          "https://novasyn.com.br",
        ][i],
        github: [
          "",
          "",
          "",
          "https://github.com/CamponezTV/NovaSyn-LTDA",
        ][i],
        details: item.details,
      }))
      const project = projectsArray.find(p => p.id === selectedProjectId)
      if (project) {
        setSelectedProject(project)
      }
    }
  }, [isOpen, selectedProjectId])

  const handleBack = () => {
    setSelectedProject(null)
  }

  const handleClose = () => {
    setSelectedProject(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-b from-card to-card/50 p-6 border-b border-border flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                {selectedProject && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={handleBack}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <ArrowLeft size={24} className="text-primary" />
                  </motion.button>
                )}
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedProject ? selectedProject.title : "Projetos"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors flex-shrink-0"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  // Project Details View
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 space-y-6"
                  >
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="aspect-video rounded-xl overflow-hidden bg-muted shadow-lg"
                    >
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <p className="text-primary font-medium text-sm mb-2">
                        {selectedProject.category}
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </motion.div>

                    {/* Detailed Information */}
                    {selectedProject.details && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4 bg-muted/50 rounded-xl p-6 border border-border"
                      >
                        {/* Challenge */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 }}
                          className="flex gap-4"
                        >
                          <Target size={24} className="text-red-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">Desafio</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedProject.details.challenge}
                            </p>
                          </div>
                        </motion.div>

                        {/* Solution */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex gap-4 pt-2"
                        >
                          <Lightbulb size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">Solução</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedProject.details.solution}
                            </p>
                          </div>
                        </motion.div>

                        {/* Results */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 }}
                          className="flex gap-4 pt-2"
                        >
                          <Zap size={24} className="text-blue-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">Resultados</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedProject.details.results}
                            </p>
                          </div>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex gap-4 pt-2"
                        >
                          <Calendar size={24} className="text-green-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">Timeline</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedProject.details.timeline}
                            </p>
                          </div>
                        </motion.div>

                        {/* Team */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 }}
                          className="flex gap-4 pt-2"
                        >
                          <Users size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">Equipe</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedProject.details.team}
                            </p>
                          </div>
                        </motion.div>

                        {/* Learnings */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="flex gap-4 pt-2"
                        >
                          <GraduationCap size={24} className="text-cyan-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">Aprendizados</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedProject.details.learnings}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Tags */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <h3 className="text-sm font-semibold text-foreground mb-3">
                        Stack Técnico
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.05 }}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Links */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex gap-3 pt-4"
                    >
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2 group"
                        >
                          <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                          Ver Projeto
                        </a>
                      )}
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium flex items-center justify-center gap-2 group"
                        >
                          <Github size={18} className="group-hover:scale-110 transition-transform" />
                          Código
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                ) : (
                  // Projects List View
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 grid md:grid-cols-2 gap-4"
                  >
                    {projects.map((project, i) => (
                      <motion.button
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedProject(project)}
                        className="text-left group"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-3">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {project.category}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {project.description}
                        </p>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
