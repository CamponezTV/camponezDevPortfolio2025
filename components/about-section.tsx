"use client"

import Image from "next/image"
import { useTranslations } from "@/hooks/use-translations"
import { Reveal } from "./reveal"
import { RoadmapSection } from "./roadmap-section"

export function AboutSection() {
  const t = useTranslations()

  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-[5fr_7fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src="/arthur-camponez.jpg"
                alt="Arthur Camponez Marinho"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal stagger delay={0.06}>
            <p data-reveal-item className="text-sm text-muted-foreground">
              {t.about.title}
            </p>
            <h2
              key={t.about.heading}
              data-reveal-item
              data-reveal-split
              className="mt-3 text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-foreground text-balance md:text-4xl"
            >
              {t.about.heading}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-7 text-subtle text-pretty">
              <p data-reveal-item>{t.about.description}</p>
              <p data-reveal-item>{t.about.subheading}</p>
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              {t.about.facts.map((fact) => (
                <div key={fact.label} data-reveal-item className="bg-background px-5 py-4">
                  <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-1 text-sm text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-16 lg:grid-cols-2 lg:gap-12">
          <RoadmapSection type="companies" />
          <RoadmapSection type="education" />
        </div>
      </div>
    </section>
  )
}
