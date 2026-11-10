import { getTranslations, type Language } from "@/config/translations"
import { HTML_LANG, LANGUAGES, homePath, projectPath, projectsPath } from "./i18n"
import type { Project } from "./projects"
import { KNOWS_ABOUT, ORGANIZATIONS, PERSON, PROFILES, SEO_COPY, SITE_URL, absoluteUrl } from "./site"

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`
const NOVASYN_ID = `${SITE_URL}/#novasyn`

type Crumb = { name: string; path: string }

function personNode(language: Language) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.fullName,
    alternateName: PERSON.shortName,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    url: SITE_URL,
    image: absoluteUrl(PERSON.photo),
    email: `mailto:${PERSON.email}`,
    jobTitle: SEO_COPY[language].jobTitle,
    description: SEO_COPY[language].description,
    worksFor: [
      { "@type": "Organization", name: ORGANIZATIONS.ocl.name, url: ORGANIZATIONS.ocl.url },
      { "@id": NOVASYN_ID },
    ],
    alumniOf: { "@type": "CollegeOrUniversity", name: ORGANIZATIONS.uvv.name, url: ORGANIZATIONS.uvv.url },
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.locality,
      addressRegion: PERSON.region,
      addressCountry: PERSON.country,
    },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: LANGUAGES.map((code) => HTML_LANG[code]),
    sameAs: [PROFILES.linkedin.url, PROFILES.github.url],
  }
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: PERSON.shortName,
    inLanguage: LANGUAGES.map((code) => HTML_LANG[code]),
    publisher: { "@id": PERSON_ID },
  }
}

function novasynNode() {
  return {
    "@type": "Organization",
    "@id": NOVASYN_ID,
    name: ORGANIZATIONS.novasyn.name,
    url: ORGANIZATIONS.novasyn.url,
    founder: { "@id": PERSON_ID },
  }
}

function breadcrumbNode(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

function graph(nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes }
}

export function homeStructuredData(language: Language) {
  const url = absoluteUrl(homePath(language))
  return graph([
    websiteNode(),
    {
      "@type": "ProfilePage",
      "@id": `${url}#profile`,
      url,
      name: SEO_COPY[language].title,
      description: SEO_COPY[language].description,
      inLanguage: HTML_LANG[language],
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
    },
    personNode(language),
    novasynNode(),
  ])
}

function projectCrumbs(language: Language): Crumb[] {
  const t = getTranslations(language)
  return [
    { name: t.nav.home, path: homePath(language) },
    { name: t.nav.projects, path: projectsPath(language) },
  ]
}

export function projectsIndexStructuredData(language: Language, projects: readonly Project[]) {
  const t = getTranslations(language)
  const url = absoluteUrl(projectsPath(language))
  return graph([
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: t.projects.index.heading,
      description: t.projects.index.metaDescription,
      inLanguage: HTML_LANG[language],
      isPartOf: { "@id": WEBSITE_ID },
      author: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(projectPath(language, project.slug)),
          name: project.title,
        })),
      },
    },
    breadcrumbNode(projectCrumbs(language)),
  ])
}

export function projectStructuredData(language: Language, project: Project) {
  const url = absoluteUrl(projectPath(language, project.slug))
  return graph([
    {
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      url,
      name: project.title,
      headline: project.title,
      description: project.description,
      image: absoluteUrl(project.image),
      genre: project.category,
      keywords: project.tags.join(", "),
      inLanguage: HTML_LANG[language],
      author: { "@type": "Person", "@id": PERSON_ID, name: PERSON.fullName, url: SITE_URL },
      isPartOf: { "@id": WEBSITE_ID },
      ...(project.link ? { sameAs: project.link } : {}),
    },
    breadcrumbNode([...projectCrumbs(language), { name: project.title, path: projectPath(language, project.slug) }]),
  ])
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
