"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"
import { useAnimationContext } from "./animation-context"
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql,
  SiTailwindcss, SiDocker, SiFigma, SiGit, SiVercel, SiBootstrap,
  SiFramer, SiThreedotjs, SiPrisma, SiJest, SiCypress,
  SiGlobus,
  SiApifox,
  SiBrevo,
  SiN8N,
  SiStripe,
  SiSupabase,
  SiAndroid
} from "react-icons/si"
import { TbApi } from "react-icons/tb";
import { Globe } from "lucide-react"

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const t = useTranslations()

  const skills = t.skills.skillsList
  const stats = t.skills.stats
  const technologies = t.skills.technologies

  // Mapeamento de tecnologias para ícones (react-icons simple icons)
  const techIcons: Record<string, any> = {
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'TypeScript': SiTypescript,
    'Node.js': SiNodedotjs,
    'API REST': TbApi,
    'TailwindCSS': SiTailwindcss,
    'PostgreSQL': SiPostgresql,
    'Docker': SiDocker,
    'Figma': SiFigma,
    'Git': SiGit,
    'CI/CD': SiVercel,
    'Vercel': SiVercel,
    'Bootstrap': SiBootstrap,
    'N8N': SiN8N,
    'Three.js': SiThreedotjs,
    'Prisma': SiPrisma,
    'Jest': SiJest,
    'Cypress': SiCypress,
    'Brevo': SiBrevo,
    'Next.JS': SiNextdotjs,
    'Stripe': SiStripe,
    'Supabase': SiSupabase,
    'React Native': SiReact,
    'Android Studio': SiAndroid,
  }

  return (
    <section ref={containerRef} id="skills" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">{t.skills.title}</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-4">
            {t.skills.heading.split(" ").slice(0, 1).join(" ")} <span className="text-gradient">{t.skills.heading.split(" ").slice(1).join(" ")}</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left - Skill Bars */}
          <div className="space-y-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className="text-primary font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full will-change-transform"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <motion.span
                  className="text-4xl md:text-5xl font-bold text-gradient block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-muted-foreground text-sm mt-2 block">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="mt-24">
          <h3 className="text-xl md:text-2xl font-semibold mb-12 text-center">{t.skills.description}</h3>
          <div className="grid grid-cols-6 gap-4 md:gap-6">
            {technologies.map((tech, i) => {
              const IconComponent = techIcons[tech] || Globe
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group cursor-default"
                >
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-primary transition-colors mb-2 md:mb-3" />
                  <span className="text-xs md:text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors font-medium line-clamp-2 w-full">
                    {tech}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
