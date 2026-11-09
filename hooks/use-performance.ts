'use client'

import { useEffect, useState } from 'react'

const LOW_MEMORY_GB = 4

interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number
}

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    if (mediaQuery.matches) {
      setReducedMotion(true)
      return
    }

    const { deviceMemory } = navigator as NavigatorWithDeviceMemory
    if (deviceMemory && deviceMemory < LOW_MEMORY_GB) {
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
