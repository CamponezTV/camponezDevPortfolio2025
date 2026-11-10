"use client"

import { useEffect, useRef, type ReactNode } from "react"
import type { Timeline } from "animejs"
import { markRevealed, playReveal, prefersReducedMotion } from "@/lib/motion"

const VIEWPORT_MARGIN = "0px 0px -10% 0px"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export function Reveal({ children, className, delay = 0, stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || "revealed" in element.dataset) return
    if (prefersReducedMotion()) {
      markRevealed(element)
      return
    }

    let timeline: Timeline | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timeline = playReveal(element, delay * 1000)
      },
      { rootMargin: VIEWPORT_MARGIN },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      timeline?.complete()
    }
  }, [delay])

  return (
    <div ref={ref} data-reveal={stagger ? "items" : "block"} className={className}>
      {children}
    </div>
  )
}
