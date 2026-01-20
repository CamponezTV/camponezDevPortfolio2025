"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Sparkles, Zap, Heart } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { useAnimationContext } from "./animation-context"
import { RoadmapSection } from "./roadmap-section"

const highlightIcons = [
  { icon: Sparkles },
  { icon: Zap },
  { icon: Heart },
]

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()
  const isInView = useInView(textRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} id="about" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="w-full h-full">
                <img
                  src="/arthur-camponez.jpg"
                  alt="Arthur Camponez Marinho"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute bottom-6 left-6 right-6 p-4 bg-card/80 backdrop-blur-xl rounded-xl border border-border"
              >
                <p className="text-sm text-muted-foreground">{t.about.badge}</p>
                <p className="text-3xl font-bold text-gradient">2021</p>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 border border-dashed border-primary/20 rounded-full will-change-transform hidden lg:block"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-5 -left-5 w-20 h-20 bg-primary/20 rounded-full blur-2xl will-change-transform hidden lg:block"
            />
          </motion.div>

          {/* Right - Content */}
          <div ref={textRef} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">{t.about.title}</span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-4 text-balance leading-tight">
                {t.about.heading.split(" ").slice(0, 1).join(" ")} <span className="text-gradient">{t.about.heading.split(" ").slice(1).join(" ")}</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-pretty"
            >
              {t.about.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-pretty"
            >
              {t.about.subheading.split('.')[0] + '.'}
              <span className="text-primary font-medium"> {t.about.subheading.split('.').slice(1).join('.')}</span>
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {highlightIcons.map((item, i) => {
                const highlightText = t.about.highlights[i]
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground">{highlightText.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{highlightText.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>

          </div>
        </div>

        {/* Roadmaps Section */}
        <div className="mt-24 space-y-32">
          {/* Companies Roadmap */}
          <div>
            <RoadmapSection type="companies" />
          </div>

          {/* Education Roadmap */}
          <div>
            <RoadmapSection type="education" />
          </div>
        </div>
      </div>
    </section>
  )
}
