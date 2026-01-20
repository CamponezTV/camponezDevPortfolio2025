"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

type RoadmapItem = {
  id: number
  title: string
  period: string
  role: string
  logo: string
  description: string
  achievements: readonly string[]
  technologies: readonly string[]
}

interface RoadmapProps {
  type: 'companies' | 'education'
}

export function RoadmapSection({ type }: RoadmapProps) {
  const t = useTranslations()
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null)
  
  // Bloquear scroll quando modal está aberto
  useEffect(() => {
    if (selectedItem) {
      document.documentElement.style.overflow = 'hidden'
      return () => {
        document.documentElement.style.overflow = ''
      }
    }
  }, [selectedItem])
  
  const roadmapData = type === 'companies' 
    ? t.about.roadmaps.companies 
    : t.about.roadmaps.education
  
  const items = roadmapData.items

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl md:text-4xl font-bold mb-2">{roadmapData.title}</h3>
        <p className="text-muted-foreground">{roadmapData.subtitle}</p>
      </motion.div>

      {/* Timeline */}
      <div className="relative space-y-8">
        {/* Vertical Line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20" />

        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex flex-col md:gap-12 items-start md:items-center ${
              index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            {/* Content */}
            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem(item)}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-4 md:gap-0 md:flex-col">
                  {/* Logo */}
                  <div className="flex-shrink-0 md:flex md:justify-center w-12 h-12 md:w-16 md:h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <img 
                      src={item.logo} 
                      alt={item.title}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-primary font-medium mt-1">{item.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.period}</p>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Timeline Dot */}
            <motion.div
              whileHover={{ scale: 1.3 }}
              className="hidden md:block relative w-6 h-6 rounded-full bg-primary border-4 border-background"
            />

            {/* Spacer */}
            <div className="flex-1 hidden md:block" />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-b from-card to-card/50 p-6 border-b border-border flex items-start justify-between">
                <div className="flex gap-4 items-start flex-1">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={selectedItem.logo}
                      alt={selectedItem.title}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedItem.title}</h2>
                    <p className="text-primary font-medium mt-1">{selectedItem.role}</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedItem.period}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors flex-shrink-0"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{roadmapData.labels.description}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{roadmapData.labels.achievements}</h3>
                  <ul className="space-y-2">
                    {selectedItem.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-3 text-muted-foreground"
                      >
                        <span className="text-primary font-bold flex-shrink-0">✓</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{roadmapData.labels.technologies}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
