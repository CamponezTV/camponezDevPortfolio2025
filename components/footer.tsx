"use client"

import { motion } from "framer-motion"
import { Instagram, Linkedin, Github, Twitter, ArrowUp } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { useAnimationContext } from "./animation-context"
import { Logo } from "./logo"

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/arthurcmarinho/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/", label: "GitHub" },
]

const navLinks = [
  { name: "Início", href: "#hero" },
  { name: "Sobre", href: "#about" },
  { name: "Habilidades", href: "#skills" },
  { name: "Projetos", href: "#projects" },
  { name: "Galeria", href: "#gallery" },
  { name: "Contato", href: "#contact" },
]

export function Footer() {
  const t = useTranslations()
  const { resetKey } = useAnimationContext()

  const navLinks = [
    { name: t.nav.home, href: "#hero" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
  ]

  return (
    <footer className="relative py-20 bg-background border-t border-border overflow-hidden" key={resetKey}>
      {/* Background Elements */}
      <div className="absolute inset-0 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-border/20 rounded-full will-change-transform"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full will-change-transform"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gradient mb-4"
            >
              {t.footer.brand}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              {t.footer.description}
            </motion.p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4 tracking-widest uppercase">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4 tracking-widest uppercase">{t.footer.contact}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="p-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Large Name Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ opacity: [0.0, 0.1, 0.0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block"
          >
            <Logo size="hp"/>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t.footer.brand}. {t.footer.rights}
          </p>

          <motion.a
            href="#hero"
            whileHover={{ y: -5 }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Voltar ao topo
            <ArrowUp size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
