"use client"

import { useEffect, useRef } from "react"
import { createTimeline, scrambleText, stagger } from "animejs"
import { useTranslations } from "@/hooks/use-translations"
import {
  clearAnimatedStyles,
  easeOutSoft,
  markRevealed,
  prefersReducedMotion,
  setStyles,
  splitIntoClippedChars,
} from "@/lib/motion"
import { ArrowLink } from "./arrow-link"

type Token = { text: string; tone: "key" | "string" | "number" | "plain" | "muted" }

const CODE_LINES: Token[][] = [
  [{ text: "const ", tone: "muted" }, { text: "arthur", tone: "plain" }, { text: " = {", tone: "muted" }],
  [{ text: "  role", tone: "key" }, { text: ": ", tone: "muted" }, { text: "'full stack engineer'", tone: "string" }, { text: ",", tone: "muted" }],
  [{ text: "  now", tone: "key" }, { text: ": [", tone: "muted" }, { text: "'OCL Advogados'", tone: "string" }, { text: ", ", tone: "muted" }, { text: "'NOVAsyn'", tone: "string" }, { text: "],", tone: "muted" }],
  [{ text: "  stack", tone: "key" }, { text: ": [", tone: "muted" }, { text: "'Next.js'", tone: "string" }, { text: ", ", tone: "muted" }, { text: "'Node.js'", tone: "string" }, { text: ", ", tone: "muted" }, { text: "'PostgreSQL'", tone: "string" }, { text: "],", tone: "muted" }],
  [{ text: "  focus", tone: "key" }, { text: ": [", tone: "muted" }, { text: "'AI'", tone: "string" }, { text: ", ", tone: "muted" }, { text: "'data'", tone: "string" }, { text: "]", tone: "muted" }, { text: ",", tone: "muted" }],
  [{ text: "  base", tone: "key" }, { text: ": ", tone: "muted" }, { text: "'Vila Velha, ES'", tone: "string" }, { text: ",", tone: "muted" }],
  [{ text: "  since", tone: "key" }, { text: ": ", tone: "muted" }, { text: "2021", tone: "number" }, { text: ",", tone: "muted" }],
  [{ text: "}", tone: "muted" }],
]

const TONE_CLASS: Record<Token["tone"], string> = {
  key: "text-accent",
  string: "text-[#d8c9a3]",
  number: "text-[#d9a7b8]",
  plain: "text-foreground",
  muted: "text-muted-foreground",
}

function playIntro(section: HTMLElement) {
  const queryAll = (selector: string) => Array.from(section.querySelectorAll<HTMLElement>(selector))
  const names = queryAll("[data-hero-name]")
  const parts = queryAll("[data-hero-part]")
  const lines = queryAll("[data-code-line]")
  const strings = queryAll("[data-code-string]")
  const chars = names.flatMap(splitIntoClippedChars)

  setStyles(chars, { translateY: "100%" })
  setStyles(parts, { opacity: 0, translateY: 12 })
  setStyles(lines, { opacity: 0, translateX: -8 })
  markRevealed(section)

  return createTimeline({
    defaults: { ease: easeOutSoft, duration: 800 },
    onComplete: () => clearAnimatedStyles([...chars, ...parts, ...lines]),
  })
    .add(chars, { translateY: "0%", delay: stagger(28) }, 0)
    .add(parts, { opacity: 1, translateY: 0, delay: stagger(80) }, 260)
    .add(lines, { opacity: 1, translateX: 0, duration: 500, delay: stagger(60) }, 360)
    .add(strings, { innerHTML: scrambleText({ chars: "a-z", cursor: true, settleDuration: 240 }), delay: stagger(70) }, 520)
}

function CodeCard() {
  return (
    <figure data-reveal-item data-hero-part className="overflow-hidden rounded-2xl border border-border bg-deep">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-xs text-subtle">arthur.ts</span>
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-raised" />
          <span className="size-2.5 rounded-full bg-raised" />
          <span className="size-2.5 rounded-full bg-raised" />
        </span>
      </div>
      <pre className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-7 md:text-sm">
        <code>
          {CODE_LINES.map((line, lineIndex) => (
            <div key={lineIndex} data-code-line className="flex">
              <span className="w-8 shrink-0 select-none text-right text-muted-foreground/50 tabular-nums">{lineIndex + 1}</span>
              <span className="pl-5 whitespace-pre">
                {line.map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    data-code-string={token.tone === "string" ? "" : undefined}
                    className={TONE_CLASS[token.tone]}
                  >
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </figure>
  )
}

export function HeroSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || "revealed" in section.dataset) return
    if (prefersReducedMotion()) {
      markRevealed(section)
      return
    }
    playIntro(section)
  }, [])

  return (
    <section ref={sectionRef} id="hero" data-reveal="items" className="relative flex min-h-svh items-center pt-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="text-sm text-muted-foreground">
            {t.hero.role} · {t.hero.location}
          </p>
          <h1
            data-reveal-item
            data-hero-name
            className="mt-6 font-wide text-[2.5rem] font-medium uppercase leading-[0.95] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-7xl"
          >
            <span className="block">Arthur</span>
            <span className="block text-accent">Camponez</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-subtle text-pretty">
            {t.hero.summary}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ArrowLink href="#projects" className="text-base">
              {t.hero.ctaProjects}
            </ArrowLink>
            <ArrowLink href="#contact" className="text-base">
              {t.hero.ctaContact}
            </ArrowLink>
          </div>
        </div>

        <CodeCard />
      </div>
    </section>
  )
}
