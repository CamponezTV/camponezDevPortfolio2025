import { getTranslations, type Language } from "@/config/translations"
import { homePath, projectPath } from "@/lib/i18n"
import { getProjects } from "@/lib/projects"
import { projectsIndexStructuredData } from "@/lib/structured-data"
import { JsonLd } from "../json-ld"
import { ProjectCard } from "../project-card"
import { Breadcrumbs, PageShell } from "./page-shell"

const PRIORITY_IMAGES = 2

export function ProjectsIndexPage({ language }: { language: Language }) {
  const t = getTranslations(language)
  const projects = getProjects(language)

  return (
    <PageShell>
      <JsonLd data={projectsIndexStructuredData(language, projects)} />
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <Breadcrumbs
          label={t.common.breadcrumb}
          crumbs={[{ name: t.nav.home, href: homePath(language) }, { name: t.nav.projects }]}
        />
        <h1 className="mt-8 text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground text-balance md:text-5xl">
          {t.projects.index.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-subtle text-pretty">{t.projects.index.description}</p>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              href={projectPath(language, project.slug)}
              labels={t.projects}
              headingLevel="h2"
              priority={index < PRIORITY_IMAGES}
            />
          ))}
        </div>

        <p className="mt-16 max-w-2xl text-sm leading-6 text-muted-foreground">{t.projects.note}</p>
      </div>
    </PageShell>
  )
}
