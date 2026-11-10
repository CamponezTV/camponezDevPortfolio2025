import { getTranslations, type Language } from "@/config/translations"

export type Project = ReturnType<typeof getTranslations>["projects"]["items"][number]

export const DETAIL_KEYS = ["challenge", "solution", "results", "timeline", "team", "learnings"] as const

export function getProjects(language: Language): readonly Project[] {
  return getTranslations(language).projects.items
}

export function getProjectSlugs(): string[] {
  return getProjects("pt").map((project) => project.slug)
}

export function findProject(language: Language, slug: string): Project | undefined {
  return getProjects(language).find((project) => project.slug === slug)
}
