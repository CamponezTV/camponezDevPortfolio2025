"use client"

import type React from "react"
import { useCallback, useState } from "react"
import { AlertCircle, ArrowUpRight, Check, Download, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/context/language-context"
import { useTranslations } from "@/hooks/use-translations"
import { PERSON, PROFILES } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { TurnstileWidget } from "./turnstile-widget"

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const MESSAGE_VISIBLE_MS = 6000
const PROFILE_LINK_REL = "me noopener noreferrer"

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" }

type FieldName = keyof typeof EMPTY_FORM
type SubmitStatus = { type: "success" | "error"; message: string }

const fieldClass = "h-11 rounded-lg border-input bg-raised px-3 text-[15px] placeholder:text-muted-foreground"

export function ContactSection() {
  const t = useTranslations()
  const { language } = useLanguage()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmitStatus | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [captchaKey, setCaptchaKey] = useState(0)
  const handleCaptchaToken = useCallback((token: string | null) => setCaptchaToken(token), [])

  const resumeFile = language === "en" ? "cv-en.pdf" : "cv-pt-br.pdf"

  const channels = [
    { icon: Mail, label: t.contact.channels.email, value: PERSON.email, href: `mailto:${PERSON.email}` },
    { icon: Linkedin, label: t.contact.channels.linkedin, value: PROFILES.linkedin.handle, href: PROFILES.linkedin.url, external: true },
    { icon: Github, label: t.contact.channels.github, value: PROFILES.github.handle, href: PROFILES.github.url, external: true },
    { icon: Download, label: t.contact.channels.resume, value: t.contact.channels.resumeAction, href: `/resume/${resumeFile}`, download: `Arthur Camponez Marinho - ${resumeFile}` },
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName
    setFormData((previous) => ({ ...previous, [name]: event.target.value }))
  }

  const showStatus = (next: SubmitStatus) => {
    setStatus(next)
    setTimeout(() => setStatus(null), MESSAGE_VISIBLE_MS)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken: captchaToken }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || t.contact.form.error)

      setFormData(EMPTY_FORM)
      showStatus({ type: "success", message: t.contact.form.success })
    } catch (error) {
      showStatus({ type: "error", message: error instanceof Error ? error.message : t.contact.form.error })
    } finally {
      setIsSubmitting(false)
      setCaptchaToken(null)
      setCaptchaKey((key) => key + 1)
    }
  }

  const fields: { name: FieldName; label: string; placeholder: string; type?: string }[] = [
    { name: "name", label: t.contact.form.name, placeholder: t.contact.form.placeholderName },
    { name: "email", label: t.contact.form.email, placeholder: t.contact.form.placeholderEmail, type: "email" },
    { name: "subject", label: t.contact.form.subject, placeholder: t.contact.form.placeholderSubject },
  ]

  const isWaitingForCaptcha = Boolean(TURNSTILE_SITE_KEY) && !captchaToken

  return (
    <section id="contact" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading label={t.contact.title} title={t.contact.heading} />

        <div className="mt-16 grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal stagger>
            <p data-reveal-item className="max-w-md text-base leading-7 text-subtle">
              {t.contact.description}
            </p>

            <ul className="mt-8 border-t border-border">
              {channels.map(({ icon: Icon, label, value, href, external, download }) => (
                <li key={label} data-reveal-item className="border-b border-border">
                  <a
                    href={href}
                    download={download}
                    {...(external ? { target: "_blank", rel: PROFILE_LINK_REL } : {})}
                    className="group flex items-center gap-4 py-4"
                  >
                    <Icon size={18} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
                    <span className="w-24 shrink-0 text-sm text-muted-foreground">{label}</span>
                    <span className="min-w-0 flex-1 truncate text-[15px] text-foreground transition-colors group-hover:text-accent">
                      {value}
                    </span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                  </a>
                </li>
              ))}
              <li data-reveal-item className="flex items-center gap-4 border-b border-border py-4">
                <MapPin size={18} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
                <span className="w-24 shrink-0 text-sm text-muted-foreground">{t.contact.channels.location}</span>
                <span className="text-[15px] text-foreground">{t.contact.channels.locationValue}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.name} className={cn("space-y-2", field.name === "subject" && "sm:col-span-2")}>
                    <label htmlFor={field.name} className="block text-sm text-subtle">
                      {field.label}
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm text-subtle">
                  {t.contact.form.message}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t.contact.form.placeholderMessage}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-36 resize-none rounded-lg border-input bg-raised px-3 py-3 text-[15px] placeholder:text-muted-foreground"
                />
              </div>

              {TURNSTILE_SITE_KEY && (
                <TurnstileWidget key={captchaKey} siteKey={TURNSTILE_SITE_KEY} onToken={handleCaptchaToken} />
              )}

              {status && (
                <p
                  role="status"
                  className={cn(
                    "flex items-start gap-2 text-sm leading-6",
                    status.type === "success" ? "text-positive" : "text-negative",
                  )}
                >
                  {status.type === "success" ? (
                    <Check size={16} strokeWidth={1.5} className="mt-1 shrink-0" />
                  ) : (
                    <AlertCircle size={16} strokeWidth={1.5} className="mt-1 shrink-0" />
                  )}
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isWaitingForCaptcha}
                className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-5 text-[15px] font-medium text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-[background-color,transform] duration-150 ease-out-soft hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? t.contact.form.sending : t.contact.form.send}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
