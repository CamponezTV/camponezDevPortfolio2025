import type { Metadata } from "next"
import { HomePage } from "@/components/pages/home-page"
import { homeMetadata } from "@/lib/metadata"

export const metadata: Metadata = homeMetadata("en")

export default function EnglishHome() {
  return <HomePage language="en" />
}
