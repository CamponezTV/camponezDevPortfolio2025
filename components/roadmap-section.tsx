"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, X } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { EASE_OUT_SOFT } from "@/lib/motion"
import { Reveal } from "./reveal"

type RoadmapItem = {
  id: number
  title: string
  period: string
  role: string
  logo: string
  description: string
  achievements: readonly string[]
  technologies: readonly string[]
}

interface RoadmapProps {
  type: "companies" | "education"
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => /^[A-Za-zÀ-ú]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("")
}

function OrgLogo({ src, alt, size }: { src: string; alt: string; size: number }) {
  if (!src) {
    return (
      <span
        aria-hidden
        className="flex shrink-0 items-center justify-center rounded-lg border border-border bg-raised font-mono text-xs text-subtle"
        style={{ width: size, height: size }}
      >
        {initialsOf(alt)}
      </span>
    )
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-lg border border-border bg-[#f3f2f9]"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain p-1.5"
        style={{ width: size, height: size }}
        onError={(event) => {
          event.currentTarget.style.display = "none"
        }}
      />
    </span>
  )
}

export function RoadmapSection({ type }: RoadmapProps) {
  const t = useTranslations()
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null)
  const roadmap = t.about.roadmaps[type]

  useEffect(() => {
    if (!selectedItem) return
    document.documentElement.style.overflow = "hidden"
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelectedItem(null)
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.documentElement.style.overflow = ""
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [selectedItem])

  return (
    <>
      <Reveal stagger>
        <h3 data-reveal-item className="text-sm text-muted-foreground">
          {roadmap.title}
        </h3>

        <ul className="mt-4 border-t border-border">
          {roadmap.items.map((item) => (
            <li key={item.id} data-reveal-item className="border-b border-border">
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group flex w-full cursor-pointer items-center gap-4 py-4 text-left transition-colors"
              >
                <OrgLogo src={item.logo} alt={item.title} size={40} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] text-foreground transition-colors group-hover:text-accent">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-subtle">{item.role}</span>
                </span>
                <span className="hidden shrink-0 font-mono text-xs text-muted-foreground tabular-nums sm:block">
                  {item.period}
                </span>
                <ChevronRight size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_SOFT }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="roadmap-dialog-title"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: EASE_OUT_SOFT }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card"
            >
              <div className="flex items-start gap-4 border-b border-border p-6">
                <OrgLogo src={selectedItem.logo} alt={selectedItem.title} size={48} />
                <div className="min-w-0 flex-1">
                  <h2 id="roadmap-dialog-title" className="text-xl font-medium text-foreground">
                    {selectedItem.title}
                  </h2>
                  <p className="mt-1 text-sm text-subtle">{selectedItem.role}</p>
                  {selectedItem.period && (
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{selectedItem.period}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label={roadmap.labels.close}
                  className="-mr-2 -mt-2 cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-raised hover:text-foreground"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-8 p-6">
                <section>
                  <h3 className="text-xs text-muted-foreground">{roadmap.labels.description}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-subtle">{selectedItem.description}</p>
                </section>

                {selectedItem.achievements.length > 0 && (
                  <section>
                    <h3 className="text-xs text-muted-foreground">{roadmap.labels.achievements}</h3>
                    <ul className="mt-3 space-y-2">
                      {selectedItem.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3 text-[15px] leading-6 text-subtle">
                          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {selectedItem.technologies.length > 0 && (
                  <section>
                    <h3 className="text-xs text-muted-foreground">{roadmap.labels.technologies}</h3>
                    <p className="mt-2 font-mono text-xs leading-6 text-subtle">{selectedItem.technologies.join(" · ")}</p>
                  </section>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
