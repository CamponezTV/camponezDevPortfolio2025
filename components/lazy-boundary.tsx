import { ReactNode, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Componente para Suspense boundaries com fallback loading
 */
export function LazySection({
  children,
  fallback = <SectionSkeleton />,
  className = '',
}: {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}) {
  return (
    <Suspense fallback={fallback}>
      <section className={className}>{children}</section>
    </Suspense>
  )
}

/**
 * Skeleton de carregamento para seções
 */
function SectionSkeleton() {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    </div>
  )
}

/**
 * Componente para fallback customizado
 */
export function LazyBoundary({
  children,
  fallback,
  className = '',
}: {
  children: ReactNode
  fallback: ReactNode
  className?: string
}) {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>{children}</div>
    </Suspense>
  )
}
