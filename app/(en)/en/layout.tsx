import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { RootDocument, SITE_VIEWPORT } from "@/components/root-document"
import { baseMetadata } from "@/lib/metadata"

export const metadata: Metadata = baseMetadata("en")
export const viewport: Viewport = SITE_VIEWPORT

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument language="en">{children}</RootDocument>
}
