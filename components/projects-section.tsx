"use client"

import { useLanguage } from "@/context/language-context"
import { useTranslations } from "@/hooks/use-translations"
import { projectPath, projectsPath } from "@/lib/i18n"
import { ArrowLink } from "./arrow-link"
import { ProjectCard } from "./project-card"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const FEATURED_COUNT = 4

export function ProjectsSection() {
  const t = useTranslations()
  const { language } = useLanguage()
  const featured = t.projects.items.slice(0, FEATURED_COUNT)

  return (
    <section id="projects" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading label={t.projects.title} title={t.projects.heading}>
          <ArrowLink href={projectsPath(language)}>{t.projects.viewMore}</ArrowLink>
        </SectionHeading>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} stagger delay={(index % 2) * 0.08}>
              <ProjectCard project={project} href={projectPath(language, project.slug)} labels={t.projects} />
            </Reveal>
          ))}
        </div>

        <p className="mt-16 max-w-2xl text-sm leading-6 text-muted-foreground">{t.projects.note}</p>
      </div>
    </section>
  )
}
