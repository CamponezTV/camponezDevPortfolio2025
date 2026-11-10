import { notFound } from "next/navigation"
import type { Language } from "@/config/translations"
import { LANGUAGES } from "@/lib/i18n"
import { renderSocialCard } from "@/lib/social-card"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return LANGUAGES.map((language) => ({ language }))
}

function isLanguage(value: string): value is Language {
  return (LANGUAGES as readonly string[]).includes(value)
}

export async function GET(_request: Request, { params }: { params: Promise<{ language: string }> }) {
  const { language } = await params
  if (!isLanguage(language)) notFound()
  return renderSocialCard(language)
}
