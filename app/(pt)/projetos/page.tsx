import type { Metadata } from "next"
import { ProjectsIndexPage } from "@/components/pages/projects-index-page"
import { projectsIndexMetadata } from "@/lib/metadata"

export const metadata: Metadata = projectsIndexMetadata("pt")

export default function PortugueseProjects() {
  return <ProjectsIndexPage language="pt" />
}
