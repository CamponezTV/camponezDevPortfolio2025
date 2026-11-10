import type { Metadata } from "next"
import { getTranslations, type Language } from "@/config/translations"
import { LANGUAGES, OPEN_GRAPH_LOCALE, homePath, languageAlternates, projectPath, projectsPath, type LocalizedPath } from "./i18n"
import { findProject } from "./projects"
import { PERSON, PROFILES, SEO_COPY, SITE_URL } from "./site"
import { socialCardImage } from "./social-card-meta"

export function homeMetadata(language: Language): Metadata {
  const copy = SEO_COPY[language]
  return pageMetadata({
    language,
    pathFor: homePath,
    title: copy.title,
    description: copy.description,
    absoluteTitle: true,
    type: "profile",
  })
}

export function projectsIndexMetadata(language: Language): Metadata {
  const { index } = getTranslations(language).projects
  return pageMetadata({ language, pathFor: projectsPath, title: index.metaTitle, description: index.metaDescription })
}

export function projectMetadata(language: Language, slug: string): Metadata {
  const project = findProject(language, slug)
  if (!project) return {}
  const { caseStudy } = getTranslations(language).projects
  return pageMetadata({
    language,
    pathFor: (target) => projectPath(target, slug),
    title: `${project.title} · ${caseStudy.label}`,
    description: project.description,
    type: "article",
  })
}

export function baseMetadata(language: Language): Metadata {
  const copy = SEO_COPY[language]
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: copy.title, template: `%s · ${PERSON.shortName}` },
    description: copy.description,
    applicationName: PERSON.shortName,
    authors: [{ name: PERSON.fullName, url: SITE_URL }],
    creator: PERSON.fullName,
    keywords: [PERSON.fullName, PERSON.shortName, ...copy.keywords, "Next.js", "React", "Node.js", "NOVAsyn"],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
    formatDetection: { telephone: false },
    category: "technology",
  }
}

interface PageMetadataInput {
  language: Language
  pathFor: LocalizedPath
  title: string
  description: string
  absoluteTitle?: boolean
  type?: "profile" | "website" | "article"
}

export function pageMetadata({ language, pathFor, title, description, absoluteTitle = false, type = "website" }: PageMetadataInput): Metadata {
  const path = pathFor(language)
  const image = socialCardImage(language)
  const profileFields =
    type === "profile"
      ? { firstName: PERSON.givenName, lastName: PERSON.familyName, username: PROFILES.linkedin.handle }
      : {}
  const articleFields = type === "article" ? { authors: [SITE_URL] } : {}

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: languageAlternates(pathFor) },
    openGraph: {
      type,
      url: path,
      siteName: PERSON.shortName,
      title,
      description,
      locale: OPEN_GRAPH_LOCALE[language],
      alternateLocale: LANGUAGES.filter((other) => other !== language).map((other) => OPEN_GRAPH_LOCALE[other]),
      images: [image],
      ...profileFields,
      ...articleFields,
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}
