"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"
import { useAnimationContext } from "./animation-context"

type GalleryImageType = {
  src: string
  alt: string
  location: string
}

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50])

  const images = t.gallery.images.map((img, i) => ({
    src: [
      "/reuniaoemequipe.jpg",
      "/festafim.jpg",
      "/premios.jpeg",

      "/uvv.png",
      "/ESX2025.jpg",
    ][i],
    alt: img.alt,
    location: img.location,
  }))

  return (
    <section ref={containerRef} id="gallery" className="relative py-32 md:py-48 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">{t.gallery.title}</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-4">
            {t.gallery.heading.split(" ").slice(0, 1).join(" ")} <span className="text-gradient">{t.gallery.heading.split(" ").slice(1).join(" ")}</span>
          </h2>
        </motion.div>

        {/* Masonry Grid with Parallax */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {/* Column 1 */}
          <motion.div style={{ y: y1 }} className="space-y-4 md:space-y-6 hidden md:block">
            {images.slice(0, 2).map((image, i) => (
              <GalleryImage key={i} image={image} index={i} />
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: y2 }} className="space-y-4 md:space-y-6 hidden md:block md:mt-12">
            {images.slice(2, 4).map((image, i) => (
              <GalleryImage key={i} image={image} index={i + 2} />
            ))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: y3 }} className="space-y-4 md:space-y-6 hidden md:block">
            {images.slice(4, 6).map((image, i) => (
              <GalleryImage key={i} image={image} index={i + 4} />
            ))}
          </motion.div>

          {/* Mobile Version - No Parallax */}
          <div className="col-span-2 md:hidden">
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, i) => (
                <GalleryImage key={i} image={image} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mt-24"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-muted-foreground leading-relaxed">
            {'"' + t.gallery.quote + '"'}
          </p>
          <footer className="mt-6">
            <cite className="text-primary font-medium not-italic">— {t.gallery.author}</cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}

function GalleryImage({ image, index }: { image: GalleryImageType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="relative group overflow-hidden rounded-xl"
    >
      <img
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay - appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content - appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {/* Description/Title */}
        <p className="text-sm md:text-base font-semibold text-white mb-2 line-clamp-2 drop-shadow-lg">
          {image.alt}
        </p>
        
        {/* Location */}
        <span className="text-xs md:text-sm text-primary font-medium drop-shadow-lg">
          📍 {image.location}
        </span>
      </div>

      {/* Border Animation */}
      <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-300 pointer-events-none" />
    </motion.div>
  )
}
