"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, MapPin, Phone, ArrowUpRight, Check, AlertCircle, Github, Linkedin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/context/language-context"

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const { toast } = useToast()
  const t = useTranslations()
  const { language } = useLanguage()

  const downloadResume = () => {
    const filename = language === 'en' ? 'English Cover Letter Arthur.pdf' : 'CV Arthur Marinho Portugues.pdf'
    const link = document.createElement('a')
    link.href = `/resume/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const contactInfo = [
    { icon: Mail, label: t.contact.info[0].label, value: t.contact.info[0].value, href: "mailto:arthurcamponez2020@gmail.com" },
    { icon: MapPin, label: t.contact.info[1].label, value: t.contact.info[1].value, href: "#" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem')
      }

      setSubmitMessage({
        type: 'success',
        message: t.contact.form.success,
      })

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      // Limpar mensagem após 5 segundos
      setTimeout(() => setSubmitMessage(null), 5000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t.contact.form.error
      setSubmitMessage({
        type: 'error',
        message: errorMessage,
      })

      // Limpar mensagem após 5 segundos
      setTimeout(() => setSubmitMessage(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={containerRef} id="contact" className="relative py-16 sm:py-32 md:py-48 bg-card/50 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-2 sm:px-6 relative z-10 max-w-full w-full overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-20 overflow-hidden"
        >
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase block">{t.contact.title}</span>
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold mt-2 sm:mt-4 leading-tight px-0 overflow-hidden break-words">
            {t.contact.heading.split(" ").slice(0, 1).join(" ")} <span className="text-gradient">{t.contact.heading.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-base md:text-lg mt-2 sm:mt-6 max-w-2xl mx-auto px-1.5 overflow-hidden break-words">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="w-full overflow-hidden max-w-full flex flex-col sm:flex-row gap-6 sm:gap-10 lg:gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3 sm:space-y-6 w-full sm:w-1/2 overflow-hidden"
          >
            <div className="space-y-2 sm:space-y-4 overflow-hidden">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group w-full overflow-hidden"
                >
                  <div className="p-1 sm:p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                    <item.icon size={20} className="sm:w-7 sm:h-7 w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <span className="text-xs text-muted-foreground block truncate line-clamp-1">{item.label}</span>
                    <span className="text-sm sm:text-base text-foreground font-medium truncate line-clamp-1">{item.value}</span>
                  </div>
                  <ArrowUpRight
                    className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                    size={16}
                  />
                </motion.a>
              ))}
              
              {/* Resume Download Button */}
              <motion.button
                onClick={downloadResume}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group w-full overflow-hidden cursor-pointer"
              >
                <div className="p-1 sm:p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                  <Download size={20} className="sm:w-7 sm:h-7 w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden text-left">
                  <span className="text-xs text-muted-foreground block truncate line-clamp-1">{t.contact.resume?.label || 'Currículo'}</span>
                  <span className="text-sm sm:text-base text-foreground font-medium truncate line-clamp-1">{t.contact.resume?.value || 'Download CV'}</span>
                </div>
                <ArrowUpRight
                  className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                  size={16}
                />
              </motion.button>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-3 sm:p-6 rounded-lg sm:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 overflow-hidden"
            >
              <h3 className="text-sm sm:text-2xl font-bold text-foreground mb-2 sm:mb-4 line-clamp-2 break-words">{t.contact.ctaTitle}</h3>
              <p className="text-xs text-muted-foreground mb-2 sm:mb-6 leading-relaxed line-clamp-2 break-words">
                {t.contact.ctaDescription}
              </p>
              <div className="flex gap-1.5 sm:gap-3 flex-col sm:flex-row">
                <motion.a
                  href="https://github.com/arthurcamponez"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 min-w-0 overflow-hidden"
                >
                  <div className="p-1.5 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden">
                    <Github size={14} className="sm:w-5 sm:h-5 text-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate hidden sm:inline">GitHub</span>
                  </div>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/arthurcmarinho/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 min-w-0"
                >
                  <div className="p-1.5 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden">
                    <Linkedin size={14} className="sm:w-5 sm:h-5 text-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate hidden sm:inline">LinkedIn</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-2.5 sm:space-y-5 p-3 sm:p-6 rounded-lg sm:rounded-2xl bg-background border border-border overflow-hidden w-full sm:w-1/2"
          >
            <div className="space-y-1.5 sm:space-y-3 overflow-hidden">
              <label htmlFor="name" className="text-xs font-medium text-foreground leading-tight block">
                {t.contact.form.name}
              </label>
              <Input
                id="name"
                name="name"
                placeholder={t.contact.form.placeholderName}
                className="text-xs sm:text-sm bg-muted border-border focus:border-primary h-8 sm:h-10 px-2 w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-3 overflow-hidden">
              <label htmlFor="email" className="text-xs font-medium text-foreground leading-tight block">
                {t.contact.form.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t.contact.form.placeholderEmail}
                className="text-xs sm:text-sm bg-muted border-border focus:border-primary h-8 sm:h-10 px-2 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-3 overflow-hidden">
              <label htmlFor="subject" className="text-xs font-medium text-foreground leading-tight block">
                {t.contact.form.subject}
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder={t.contact.form.placeholderSubject}
                className="text-xs sm:text-sm bg-muted border-border focus:border-primary h-8 sm:h-10 px-2 w-full"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-3 overflow-hidden">
              <label htmlFor="message" className="text-xs font-medium text-foreground leading-tight block">
                {t.contact.form.message}
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder={t.contact.form.placeholderMessage}
                className="text-xs sm:text-sm bg-muted border-border focus:border-primary min-h-[80px] sm:min-h-[150px] resize-none p-2 w-full"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-1 sm:p-4 rounded-lg border flex items-start gap-1 text-xs ${
                  submitMessage.type === 'success'
                    ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                }`}
              >
                {submitMessage.type === 'success' ? (
                  <Check className="flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" size={8} />
                ) : (
                  <AlertCircle className="flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" size={8} />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-xs ${
                    submitMessage.type === 'success'
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-red-900 dark:text-red-100'
                  }`}>
                    {submitMessage.type === 'success' ? '✅ Sucesso!' : '❌ Erro'}
                  </p>
                  <p className={`text-xs mt-0.5 break-words line-clamp-2 ${
                    submitMessage.type === 'success'
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {submitMessage.message}
                  </p>
                </div>
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full text-xs sm:text-base py-1.5 sm:py-3 h-9 sm:h-11 bg-primary text-primary-foreground hover:bg-primary/90 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {t.contact.form.sending}
                </motion.span>
              ) : (
                <>
                  {t.contact.form.send}
                  <Send
                    className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    size={18}
                  />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
