"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useTranslations } from "@/hooks/use-translations"
import { HTML_LANG, LANGUAGES, sectionPath, translatePath } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { EASE_OUT_SOFT } from "@/lib/motion"

function LanguageSwitch() {
  const { language } = useLanguage()
  const pathname = usePathname() ?? "/"
  const t = useTranslations()

  return (
    <div role="group" aria-label={t.common.language} className="flex items-center gap-1 font-mono text-xs">
      {LANGUAGES.map((code) => (
        <a
          key={code}
          href={translatePath(pathname, code)}
          hrefLang={HTML_LANG[code]}
          lang={HTML_LANG[code]}
          aria-current={language === code ? "true" : undefined}
          className={cn(
            "flex h-8 items-center rounded-md px-2 uppercase transition-colors",
            language === code ? "bg-raised text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code}
        </a>
      ))}
    </div>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations()
  const { language } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])

  const navItems = [
    { name: t.nav.about, href: sectionPath(language, "about") },
    { name: t.nav.skills, href: sectionPath(language, "skills") },
    { name: t.nav.projects, href: sectionPath(language, "projects") },
    { name: t.nav.contact, href: sectionPath(language, "contact") },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
          scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
          <a href={sectionPath(language, "hero")} aria-label={t.nav.home} className="flex items-center gap-3 text-foreground">
            <Logo size={28} />
            <span className="text-sm font-medium">Arthur Camponez</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-subtle transition-colors hover:text-foreground">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <LanguageSwitch />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="-mr-2 cursor-pointer rounded-md p-2 text-foreground md:hidden"
            aria-label={t.common.menu}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_SOFT }}
            className="fixed inset-0 z-[100] flex flex-col bg-background px-6 md:hidden"
          >
            <div className="flex h-16 items-center justify-between">
              <Logo size={28} />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="-mr-2 cursor-pointer rounded-md p-2 text-foreground"
                aria-label={t.common.closeMenu}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-3xl font-medium text-foreground transition-colors hover:text-accent"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto border-t border-border py-6">
              <LanguageSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
