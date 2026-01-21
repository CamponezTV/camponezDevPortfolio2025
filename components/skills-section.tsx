"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"
import { useAnimationContext } from "./animation-context"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql,
  SiTailwindcss, SiDocker, SiFigma, SiGit, SiVercel, SiBootstrap,
  SiThreedotjs, SiPrisma, SiJest, SiCypress,
  SiBrevo,
  SiN8N,
  SiStripe,
  SiSupabase,
  SiAndroid,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiPython,
} from "react-icons/si"
import { TbApi } from "react-icons/tb";
import { Globe } from "lucide-react"

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const t = useTranslations()
  const carouselRef = useRef<any>(null)
  const [isAutoplay, setIsAutoplay] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const skills = t.skills.skillsList
  const stats = t.skills.stats
  const technologies = t.skills.technologies

  // Auto-play infinito
  useEffect(() => {
    if (!isAutoplay || !carouselRef.current) return

    const timer = setInterval(() => {
      if (carouselRef.current.canScrollNext()) {
        carouselRef.current.scrollNext()
      } else {
        carouselRef.current.scrollTo(0)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isAutoplay])

  // Mapeamento de tecnologias para ícones (react-icons simple icons)
  const techIcons: Record<string, any> = {
    'React': SiReact,
    'React.js': SiReact,
    'Next.js': SiNextdotjs,
    'Next.JS': SiNextdotjs,
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
    'Brevo API': SiBrevo,
    'Stripe': SiStripe,
    'Supabase': SiSupabase,
    'React Native': SiReact,
    'Android Studio': SiAndroid,
    'Express': SiExpress,
    'MySQL': SiMysql,
    'MongoDB': SiMongodb,
    'Python': SiPython,
    'Java': Globe,
    'HTML': Globe,
    'CSS': Globe,
    'JavaScript': Globe,
    'AppSheet': Globe,
    'GitHub': SiGit,
    'Agile': Globe,
    'Scrum': Globe,
    'Jira': Globe,
    'UML': Globe,
    'C': Globe,
    'Game Design': Globe,
    'Cloud Computing': Globe,
    'Microservices': Globe,
    'Kubernetes': SiDocker,
    'OpenShift': Globe,
    'NoSQL': SiMongodb,
    'SQL': SiPostgresql,
    'Inglês': Globe,
    'Espanhol': Globe,
    'Hospitalidade': Globe,
    'Atendimento ao Cliente': Globe,
    'Engenharia de Software': Globe,
    'Arquitetura de Software': Globe,
    'Transformação Digital': Globe,
    'DevOps': SiDocker,
    'Mercado Pago API': Globe,
    'WhatsApp API': Globe,
    'Coolify': SiDocker,
    'CA Harvest SCM': SiGit,
  }

  return (
    <section ref={containerRef} id="skills" className="relative py-20 md:py-32 overflow-hidden">
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

        {/* Technologies Carousel */}
        <motion.div 
          initial={{ opacity: 0}}
          whileInView={{ opacity: 1}}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
          style={{ y, opacity }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-12 text-center">{t.skills.description}</h3>
          
          <div 
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
            onTouchStart={() => setIsAutoplay(false)}
            onTouchEnd={() => setIsAutoplay(true)}
            className="cursor-grab active:cursor-grabbing overflow-visible"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
              setApi={(api) => {
                carouselRef.current = api
              }}
              className="w-full overflow-visible"
            >
              <CarouselContent className="-ml-2 md:-ml-4 overflow-visible">
                {technologies.map((tech, i) => {
                  const IconComponent = techIcons[tech] || Globe
                  return (
                    <CarouselItem key={i} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                      <motion.div
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center p-2.5 sm:p-4 md:p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group/tech h-full"
                      >
                        <IconComponent className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-muted-foreground group-hover/tech:text-primary transition-colors mb-2 sm:mb-3" />
                        <span className="text-[10px] sm:text-xs md:text-sm text-center text-muted-foreground group-hover/tech:text-foreground transition-colors font-medium line-clamp-2 w-full">
                          {tech}
                        </span>
                      </motion.div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Scroll Hint */}
          <div className="text-center mt-6 text-xs text-muted-foreground">
            Arraste para explorar mais →
          </div>
        </motion.div>
      </div>
    </section>
  )
}
