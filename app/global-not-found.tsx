import type { Metadata, Viewport } from "next"
import { RootDocument, SITE_VIEWPORT } from "@/components/root-document"
import { ArrowLink } from "@/components/arrow-link"
import { homePath } from "@/lib/i18n"
import { baseMetadata } from "@/lib/metadata"

export const metadata: Metadata = {
  ...baseMetadata("pt"),
  title: "Página não encontrada · Page not found",
  robots: { index: false, follow: true },
}
export const viewport: Viewport = SITE_VIEWPORT

export default function GlobalNotFound() {
  return (
    <RootDocument language="pt">
      <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-24 md:px-8">
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.02em] text-foreground md:text-5xl">Página não encontrada</h1>
        <p lang="en" className="mt-2 text-xl text-subtle">
          Page not found
        </p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <ArrowLink href={homePath("pt")} className="text-base">
            Voltar para o início
          </ArrowLink>
          <ArrowLink href={homePath("en")} lang="en" className="text-base">
            Go to the English home page
          </ArrowLink>
        </div>
      </main>
    </RootDocument>
  )
}
