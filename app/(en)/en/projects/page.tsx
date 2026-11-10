import type { Metadata } from "next"
import { ProjectsIndexPage } from "@/components/pages/projects-index-page"
import { projectsIndexMetadata } from "@/lib/metadata"

export const metadata: Metadata = projectsIndexMetadata("en")

export default function EnglishProjects() {
  return <ProjectsIndexPage language="en" />
}
