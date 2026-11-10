import type { Language } from "@/config/translations"

export const LANGUAGES: readonly Language[] = ["pt", "en"]
export const DEFAULT_LANGUAGE: Language = "pt"

export const HTML_LANG: Record<Language, string> = { pt: "pt-BR", en: "en" }
export const OPEN_GRAPH_LOCALE: Record<Language, string> = { pt: "pt_BR", en: "en_US" }

const HOME_PATH: Record<Language, string> = { pt: "/", en: "/en" }
const PROJECTS_PATH: Record<Language, string> = { pt: "/projetos", en: "/en/projects" }
const PROJECTS_ROUTE = /^(?:\/projetos|\/en\/projects)(?:\/([^/]+))?\/?$/

export type LocalizedPath = (language: Language) => string

export const homePath: LocalizedPath = (language) => HOME_PATH[language]
export const projectsPath: LocalizedPath = (language) => PROJECTS_PATH[language]

export function projectPath(language: Language, slug: string): string {
  return `${PROJECTS_PATH[language]}/${slug}`
}

export function sectionPath(language: Language, sectionId: string): string {
  return `${HOME_PATH[language]}#${sectionId}`
}

export function translatePath(pathname: string, target: Language): string {
  const projectRoute = pathname.match(PROJECTS_ROUTE)
  if (!projectRoute) return homePath(target)
  const [, slug] = projectRoute
  return slug ? projectPath(target, slug) : projectsPath(target)
}

export function languageAlternates(pathFor: LocalizedPath): Record<string, string> {
  return {
    [HTML_LANG.pt]: pathFor("pt"),
    [HTML_LANG.en]: pathFor("en"),
    "x-default": pathFor(DEFAULT_LANGUAGE),
  }
}
