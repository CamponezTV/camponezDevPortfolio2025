import Image from "next/image"
import type { Project } from "@/lib/projects"
import { ArrowLink } from "./arrow-link"

interface ProjectCardLabels {
  details: string
  viewProject: string
  code: string
}

interface ProjectCardProps {
  project: Project
  href: string
  labels: ProjectCardLabels
  headingLevel?: "h2" | "h3"
  priority?: boolean
}

export function ProjectCard({ project, href, labels, headingLevel: Heading = "h3", priority = false }: ProjectCardProps) {
  return (
    <article>
      <a href={href} data-reveal-item tabIndex={-1} aria-hidden className="group block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src={project.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-opacity duration-200 group-hover:opacity-90"
          />
        </div>
      </a>

      <div data-reveal-item className="mt-6">
        <p className="text-sm text-muted-foreground">{project.category}</p>
        <Heading className="mt-1 text-xl font-medium text-foreground">
          <a href={href} className="transition-colors hover:text-accent">
            {project.title}
          </a>
        </Heading>
        <p className="mt-2 text-[15px] leading-7 text-subtle">{project.description}</p>
        <p className="mt-3 font-mono text-xs leading-6 text-muted-foreground">{project.tags.join(" · ")}</p>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <ArrowLink href={href}>{labels.details}</ArrowLink>
          {project.link && (
            <ArrowLink href={project.link} external>
              {labels.viewProject}
            </ArrowLink>
          )}
          {project.github && (
            <ArrowLink href={project.github} external>
              {labels.code}
            </ArrowLink>
          )}
        </div>
      </div>
    </article>
  )
}
