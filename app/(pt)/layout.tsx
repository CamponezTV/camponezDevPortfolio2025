import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { RootDocument, SITE_VIEWPORT } from "@/components/root-document"
import { baseMetadata } from "@/lib/metadata"

export const metadata: Metadata = baseMetadata("pt")
export const viewport: Viewport = SITE_VIEWPORT

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return <RootDocument language="pt">{children}</RootDocument>
}
