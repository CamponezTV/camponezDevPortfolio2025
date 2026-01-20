"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, MapPin, Phone, ArrowUpRight, Check, AlertCircle, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/hooks/use-translations"

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
    <section ref={containerRef} id="contact" className="relative py-32 md:py-48 bg-card/50">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">{t.contact.title}</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-4">
            {t.contact.heading.split(" ").slice(0, 1).join(" ")} <span className="text-gradient">{t.contact.heading.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-6 max-w-2xl mx-auto px-4">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">{item.label}</span>
                    <span className="text-foreground font-medium">{item.value}</span>
                  </div>
                  <ArrowUpRight
                    className="ml-auto text-muted-foreground group-hover:text-primary transition-colors"
                    size={20}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">{t.contact.ctaTitle}</h3>
              <p className="text-muted-foreground mb-6">
                {t.contact.ctaDescription}
              </p>
              <div className="flex gap-3 flex-col sm:flex-row">
                <motion.a
                  href="https://github.com/arthurcamponez"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group cursor-pointer flex items-center justify-center gap-2">
                    <Github size={20} className="text-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">GitHub</span>
                  </div>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/arthurcmarinho/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <div className="p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group cursor-pointer flex items-center justify-center gap-2">
                    <Linkedin size={20} className="text-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">LinkedIn</span>
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
            className="space-y-6 p-8 rounded-2xl bg-background border border-border"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t.contact.form.name}
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t.contact.form.placeholderName}
                  className="bg-muted border-border focus:border-primary"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t.contact.form.email}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.contact.form.placeholderEmail}
                  className="bg-muted border-border focus:border-primary"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-foreground">
                {t.contact.form.subject}
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder={t.contact.form.placeholderSubject}
                className="bg-muted border-border focus:border-primary"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                {t.contact.form.message}
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder={t.contact.form.placeholderMessage}
                className="bg-muted border-border focus:border-primary min-h-[150px] resize-none"
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
                className={`p-4 rounded-lg border flex items-start gap-3 ${
                  submitMessage.type === 'success'
                    ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                }`}
              >
                {submitMessage.type === 'success' ? (
                  <Check className="flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" size={20} />
                ) : (
                  <AlertCircle className="flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" size={20} />
                )}
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${
                    submitMessage.type === 'success'
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-red-900 dark:text-red-100'
                  }`}>
                    {submitMessage.type === 'success' ? '✅ Sucesso!' : '❌ Erro'}
                  </p>
                  <p className={`text-sm mt-1 ${
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
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group"
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
