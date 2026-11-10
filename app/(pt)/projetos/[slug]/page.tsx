import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProjectPage } from "@/components/pages/project-page"
import { projectMetadata } from "@/lib/metadata"
import { findProject, getProjectSlugs } from "@/lib/projects"

type ProjectRouteProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params
  return projectMetadata("pt", slug)
}

export default async function PortugueseProject({ params }: ProjectRouteProps) {
  const { slug } = await params
  const project = findProject("pt", slug)
  if (!project) notFound()
  return <ProjectPage language="pt" project={project} />
}
