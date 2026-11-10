import type { ReactNode } from "react"
import { Reveal } from "./reveal"

interface SectionHeadingProps {
  label: string
  title: string
  children?: ReactNode
}

export function SectionHeading({ label, title, children }: SectionHeadingProps) {
  return (
    <Reveal stagger className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p data-reveal-item className="text-sm text-muted-foreground">
          {label}
        </p>
        <h2
          key={title}
          data-reveal-item
          data-reveal-split
          className="mt-3 text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-foreground text-balance md:text-4xl"
        >
          {title}
        </h2>
      </div>
      {children && <div data-reveal-item>{children}</div>}
    </Reveal>
  )
}
