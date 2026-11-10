import Image from "next/image"
import { getTranslations, type Language } from "@/config/translations"
import { homePath, projectPath, projectsPath, sectionPath } from "@/lib/i18n"
import { DETAIL_KEYS, getProjects, type Project } from "@/lib/projects"
import { projectStructuredData } from "@/lib/structured-data"
import { ArrowLink } from "../arrow-link"
import { JsonLd } from "../json-ld"
import { Breadcrumbs, PageShell } from "./page-shell"

const OTHER_PROJECTS_COUNT = 3

function otherProjects(language: Language, current: Project): Project[] {
  return getProjects(language)
    .filter((project) => project.slug !== current.slug)
    .slice(0, OTHER_PROJECTS_COUNT)
}

export function ProjectPage({ language, project }: { language: Language; project: Project }) {
  const t = getTranslations(language)
  const labels = t.projects.caseStudy
  const details = DETAIL_KEYS.filter((key) => project.details[key])

  return (
    <PageShell>
      <JsonLd data={projectStructuredData(language, project)} />
      <article className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        <Breadcrumbs
          label={t.common.breadcrumb}
          crumbs={[
            { name: t.nav.home, href: homePath(language) },
            { name: t.nav.projects, href: projectsPath(language) },
            { name: project.title },
          ]}
        />

        <header className="mt-8">
          <p className="text-sm text-muted-foreground">
            {labels.label} · {project.category}
          </p>
          <h1 className="mt-3 text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground text-balance md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-subtle text-pretty">{project.description}</p>
          {(project.link || project.github) && (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {project.link && (
                <ArrowLink href={project.link} external>
                  {t.projects.viewProject}
                </ArrowLink>
              )}
              {project.github && (
                <ArrowLink href={project.github} external>
                  {t.projects.code}
                </ArrowLink>
              )}
            </div>
          )}
        </header>

        <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(min-width: 896px) 832px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-16 divide-y divide-border border-y border-border">
          {details.map((key) => (
            <section key={key} className="grid gap-3 py-8 md:grid-cols-[180px_1fr] md:gap-10">
              <h2 className="text-sm text-muted-foreground">{labels[key]}</h2>
              <p className="text-base leading-7 text-subtle text-pretty">{project.details[key]}</p>
            </section>
          ))}
          <section className="grid gap-3 py-8 md:grid-cols-[180px_1fr] md:gap-10">
            <h2 className="text-sm text-muted-foreground">{labels.techStack}</h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-subtle">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-16 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-medium tracking-[-0.01em] text-foreground">{labels.ctaTitle}</h2>
          <p className="mt-3 text-base leading-7 text-subtle">{labels.ctaDescription}</p>
          <ArrowLink href={sectionPath(language, "contact")} className="mt-6 text-base">
            {labels.ctaAction}
          </ArrowLink>
        </section>
      </article>

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-8">
          <h2 className="text-sm text-muted-foreground">{labels.otherProjects}</h2>
          <ul className="mt-4 border-t border-border">
            {otherProjects(language, project).map((other) => (
              <li key={other.slug} className="border-b border-border">
                <a href={projectPath(language, other.slug)} className="group flex items-baseline justify-between gap-6 py-5">
                  <span className="text-lg text-foreground transition-colors group-hover:text-accent">{other.title}</span>
                  <span className="shrink-0 text-sm text-muted-foreground">{other.category}</span>
                </a>
              </li>
            ))}
          </ul>
          <ArrowLink href={projectsPath(language)} className="mt-8">
            {t.projects.viewMore}
          </ArrowLink>
        </div>
      </section>
    </PageShell>
  )
}
