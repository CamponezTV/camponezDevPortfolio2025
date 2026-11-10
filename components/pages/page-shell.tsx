import type { ReactNode } from "react"
import { Footer } from "../footer"
import { Navigation } from "../navigation"

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="relative w-full overflow-x-hidden pt-16">{children}</main>
      <Footer />
    </>
  )
}

export interface Crumb {
  name: string
  href?: string
}

export function Breadcrumbs({ label, crumbs }: { label: string; crumbs: Crumb[] }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {crumbs.map((crumb, index) => (
          <li key={crumb.name} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden>/</span>}
            {crumb.href ? (
              <a href={crumb.href} className="transition-colors hover:text-foreground">
                {crumb.name}
              </a>
            ) : (
              <span aria-current="page" className="text-subtle">
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
