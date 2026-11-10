import type { MetadataRoute } from "next"
import { HTML_LANG, LANGUAGES, homePath, projectPath, projectsPath, type LocalizedPath } from "@/lib/i18n"
import { getProjectSlugs } from "@/lib/projects"
import { RESUME_FILES, absoluteUrl } from "@/lib/site"

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>

interface LocalizedPage {
  pathFor: LocalizedPath
  changeFrequency: ChangeFrequency
  priority: number
}

function localizedPages(): LocalizedPage[] {
  return [
    { pathFor: homePath, changeFrequency: "monthly", priority: 1 },
    { pathFor: projectsPath, changeFrequency: "monthly", priority: 0.8 },
    ...getProjectSlugs().map((slug) => ({
      pathFor: (language: Parameters<LocalizedPath>[0]) => projectPath(language, slug),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ]
}

function languageUrls(pathFor: LocalizedPath): Record<string, string> {
  return Object.fromEntries(LANGUAGES.map((language) => [HTML_LANG[language], absoluteUrl(pathFor(language))]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const pages = localizedPages().flatMap(({ pathFor, changeFrequency, priority }) =>
    LANGUAGES.map((language) => ({
      url: absoluteUrl(pathFor(language)),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageUrls(pathFor) },
    })),
  )
  const resumes = RESUME_FILES.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }))
  return [...pages, ...resumes]
}
