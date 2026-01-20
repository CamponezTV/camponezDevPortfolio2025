import { useEffect } from 'react'

/**
 * Hook para reinitializar animações whileInView quando o usuário volta da página
 * Força um pequeno scroll para retrigger animations
 */
export function useAnimationTrigger() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Force re-trigger of animations by scrolling slightly
        const currentScroll = window.scrollY
        requestAnimationFrame(() => {
          window.scrollTo(0, currentScroll + 1)
          requestAnimationFrame(() => {
            window.scrollTo(0, currentScroll)
          })
        })
      }
    }

    const handleFocus = () => {
      // Also reinit when window regains focus
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
}
