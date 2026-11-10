export const SITE_URL = "https://www.camponez.com.br"

export const GOOGLE_TAG_MANAGER_ID = "GTM-TW3GR55R"

export const PERSON = {
  fullName: "Arthur Camponez Marinho",
  shortName: "Arthur Camponez",
  givenName: "Arthur",
  familyName: "Camponez Marinho",
  email: "arthurcamponez2020@gmail.com",
  photo: "/arthur-camponez.jpg",
  locality: "Vila Velha",
  region: "ES",
  country: "BR",
} as const

export const PROFILES = {
  linkedin: { url: "https://www.linkedin.com/in/arthurcmarinho/", handle: "arthurcmarinho" },
  github: { url: "https://github.com/CamponezTV", handle: "CamponezTV" },
} as const

export const ORGANIZATIONS = {
  ocl: { name: "OCL Advogados", url: "https://ocladvogados.adv.br/" },
  novasyn: { name: "NOVAsyn", url: "https://novasyn.com.br/" },
  uvv: { name: "Universidade Vila Velha", url: "https://www.uvv.br/" },
} as const

export const SEO_COPY = {
  pt: {
    title: "Arthur Camponez · Desenvolvedor full stack em Vila Velha, ES",
    description:
      "Desenvolvedor full stack em Vila Velha (ES). IA e dados na OCL Advogados, cofundador e CTO da NOVAsyn. Veja projetos, currículo e contato para vagas e freelas.",
    jobTitle: "Desenvolvedor full stack",
    tagline: "Desenvolvedor full stack · IA e dados",
    place: `${PERSON.locality}, ${PERSON.region}`,
    keywords: [
      "desenvolvedor full stack",
      "desenvolvedor Vila Velha",
      "desenvolvedor Espírito Santo",
      "programador Next.js",
      "engenharia de dados",
      "inteligência artificial",
    ],
  },
  en: {
    title: "Arthur Camponez · Full stack developer in Vila Velha, Brazil",
    description:
      "Full stack developer in Vila Velha, Brazil. AI and data at OCL Advogados, co-founder and CTO of NOVAsyn. See projects, resume and contact for jobs and freelance work.",
    jobTitle: "Full stack developer",
    tagline: "Full stack developer · AI and data",
    place: `${PERSON.locality}, Brazil`,
    keywords: [
      "full stack developer",
      "full stack developer Brazil",
      "remote full stack developer",
      "Next.js developer",
      "data engineering",
      "artificial intelligence",
    ],
  },
} as const

export const KNOWS_ABOUT = [
  "Full stack development",
  "Next.js",
  "React",
  "React Native",
  "TypeScript",
  "Node.js",
  "Fastify",
  "PostgreSQL",
  "Data engineering",
  "dbt",
  "Airbyte",
  "Artificial intelligence",
  "AI automation",
  "AWS",
  "Docker",
] as const

export const RESUME_FILES = ["/resume/cv-pt-br.pdf", "/resume/cv-en.pdf"] as const

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`
}
