import type { Language } from "@/config/translations"
import { PERSON, SEO_COPY } from "./site"

export const SOCIAL_CARD_SIZE = { width: 1200, height: 630 }

export function socialCardAlt(language: Language): string {
  const copy = SEO_COPY[language]
  return `${PERSON.shortName}, ${copy.jobTitle.toLowerCase()} · ${copy.place}`
}

export function socialCardPath(language: Language): string {
  return `/og/${language}`
}

export function socialCardImage(language: Language) {
  return { url: socialCardPath(language), ...SOCIAL_CARD_SIZE, alt: socialCardAlt(language), type: "image/png" }
}
