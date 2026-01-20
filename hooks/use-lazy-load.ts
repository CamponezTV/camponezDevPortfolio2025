import { useEffect, useRef, useState } from 'react'

interface UseLazyLoadOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Hook para lazy loading de elementos e imagens
 * Usa Intersection Observer API para carregar conteúdo quando visível
 */
export function useLazyLoad(options?: UseLazyLoadOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '50px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options?.threshold, options?.rootMargin])

  return { ref, isVisible }
}

/**
 * Hook para preload de imagens
 * Útil para carregar imagens críticas com antecedência
 */
export function useImagePreload(imageSrc: string) {
  useEffect(() => {
    if (!imageSrc) return

    const img = new Image()
    img.src = imageSrc
  }, [imageSrc])
}

/**
 * Hook para carregar componentes pesados sob demanda
 * Reduz bundle size inicial
 */
export function useComponentLoad(delayMs: number = 0) {
  const [isLoaded, setIsLoaded] = useState(delayMs === 0)

  useEffect(() => {
    if (delayMs === 0) return

    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [delayMs])

  return isLoaded
}
