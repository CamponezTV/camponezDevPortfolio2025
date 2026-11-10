"use client"

import Image from "next/image"
import { useTranslations } from "@/hooks/use-translations"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const GALLERY_SOURCES = [
  "/ensaio-novasyn-socios.webp",
  "/reuniaoemequipe.jpg",
  "/ensaio-2026-retrato.webp",
  "/festafim.jpg",
  "/premios.jpeg",
  "/ensaio-2026-sentado.webp",
  "/uvv.png",
  "/ESX2025.jpg",
]

export function GallerySection() {
  const t = useTranslations()

  const images = t.gallery.images.map((image, index) => ({ ...image, src: GALLERY_SOURCES[index] }))

  return (
    <section id="gallery" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading label={t.gallery.title} title={t.gallery.heading} />

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={(index % 3) * 0.05} className="mb-8 break-inside-avoid">
              <figure>
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={0}
                    height={0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="text-sm leading-6 text-subtle">{image.alt}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{image.location}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-24 max-w-3xl border-t border-border pt-12">
          <blockquote>
            <p className="text-2xl leading-[1.4] tracking-[-0.01em] text-foreground text-balance md:text-3xl">
              “{t.gallery.quote}”
            </p>
            <footer className="mt-6 text-sm text-muted-foreground">{t.gallery.author}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
