"use client"

import { Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useTranslations } from "@/hooks/use-translations"
import { sectionPath } from "@/lib/i18n"
import { PROFILES } from "@/lib/site"
import { ArrowLink } from "./arrow-link"
import { Logo } from "./logo"

const SOCIAL_LINKS = [
  { icon: Linkedin, href: PROFILES.linkedin.url, label: "LinkedIn" },
  { icon: Github, href: PROFILES.github.url, label: "GitHub" },
]

export function Footer() {
  const t = useTranslations()
  const { language } = useLanguage()

  const navLinks = [
    { name: t.nav.about, href: sectionPath(language, "about") },
    { name: t.nav.skills, href: sectionPath(language, "skills") },
    { name: t.nav.projects, href: sectionPath(language, "projects") },
    { name: t.nav.contact, href: sectionPath(language, "contact") },
  ]

  return (
    <footer className="border-t border-border bg-deep">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 text-foreground">
              <Logo size={28} />
              <span className="text-sm font-medium">{t.footer.brand}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{t.footer.description}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-subtle transition-colors hover:text-foreground">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="me noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-raised hover:text-foreground"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t.footer.brand} · {t.footer.rights}
          </p>
          <ArrowLink href="#top" className="text-subtle">
            {t.footer.backToTop}
          </ArrowLink>
        </div>
      </div>
    </footer>
  )
}
