"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ChevronDown, Instagram, Linkedin, Github, Twitter } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/arthurcmarinho/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/", label: "GitHub" },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: smoothY }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] will-change-transform"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] will-change-transform"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "70%"]) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] will-change-transform hidden lg:block"
        />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Main Content */}
      <motion.div
        style={{ opacity: smoothOpacity, scale: smoothScale }}
        className="relative z-10 container mx-auto px-4 sm:px-6 text-center"
      >
        {/* Name */}
        <motion.h1 style={{ y: textY }} className="relative">
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-balance leading-none"
          >
            Arthur
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-gradient leading-none"
          >
            Camponez
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none"
          >
            Marinho
          </motion.span>
        </motion.h1>

        {/* Animated Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.76, 0, 0.24, 1] }}
          className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-12"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-4"
        >
          {t.hero.description}
          <br />
          <span className="text-primary">{t.hero.passion}</span>
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 flex-wrap px-4"
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="p-3 text-muted-foreground hover:text-primary transition-colors border border-border rounded-full hover:border-primary/50 hover:bg-primary/5"
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="writing-mode-vertical text-xs tracking-[0.3em] text-muted-foreground uppercase">
          {t.hero.since}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <ChevronDown size={20} />
        </motion.a>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }}
        className="absolute top-1/4 right-1/4 w-20 h-20 border border-primary/20 rounded-full hidden lg:block will-change-transform"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }}
        className="absolute bottom-1/3 left-1/4 w-12 h-12 border border-accent/20 rounded-lg hidden lg:block will-change-transform"
      />
    </section>
  )
}
