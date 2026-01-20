'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface AnimationContextType {
  isPageVisible: boolean
  resetKey: number
}

const AnimationContext = createContext<AnimationContextType>({
  isPageVisible: true,
  resetKey: 0,
})

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated after first render
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible again
        setIsPageVisible(true)
        // Change reset key to force re-mounting of components
        setResetKey(prev => prev + 1)
        
        // Small scroll to trigger animations
        const currentScroll = window.scrollY
        requestAnimationFrame(() => {
          window.scrollTo(0, currentScroll + 1)
          requestAnimationFrame(() => {
            window.scrollTo(0, currentScroll)
          })
        })
      } else {
        setIsPageVisible(false)
      }
    }

    const handleFocus = () => {
      setIsPageVisible(true)
      setResetKey(prev => prev + 1)
      
      const currentScroll = window.scrollY
      requestAnimationFrame(() => {
        window.scrollTo(0, currentScroll + 1)
        requestAnimationFrame(() => {
          window.scrollTo(0, currentScroll)
        })
      })
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  return (
    <AnimationContext.Provider value={{ isPageVisible, resetKey }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimationContext() {
  return useContext(AnimationContext)
}
