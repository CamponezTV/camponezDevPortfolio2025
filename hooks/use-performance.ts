'use client'

import { useEffect, useState } from 'react'

/**
 * Hook para detectar performance reduzida
 * Retorna true se o navegador tem performance baixa (ex: Firefox em máquinas lentas)
 */
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    if (mediaQuery.matches) {
      setReducedMotion(true)
      return
    }

    // Check for low-end devices (optional)
    // You can add more checks here based on your needs
    if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) {
      setReducedMotion(true)
      return
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return reducedMotion
}

/**
 * Hook para detectar se está em device mobile/tablet
 */
export function useIsSmallDevice() {
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const checkSize = () => {
      setIsSmall(window.innerWidth < 768)
    }

    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  return isSmall
}
