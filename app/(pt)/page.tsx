import type { Metadata } from "next"
import { HomePage } from "@/components/pages/home-page"
import { homeMetadata } from "@/lib/metadata"

export const metadata: Metadata = homeMetadata("pt")

export default function PortugueseHome() {
  return <HomePage language="pt" />
}
