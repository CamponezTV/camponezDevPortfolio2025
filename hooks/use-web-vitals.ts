import { useEffect } from 'react'

export interface WebVitals {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

/**
 * Hook para monitorar Web Vitals (LCP, FID, CLS, etc)
 * Usa Web Vitals library para tracking
 */
export function useWebVitals(callback?: (vitals: WebVitals) => void) {
  useEffect(() => {
    if (typeof window === 'undefined' || !callback) return

    const observers: PerformanceObserver[] = []

    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any

        callback({
          name: 'LCP',
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: getRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
          delta: 0,
          id: `lcp-${Date.now()}`,
        })
      })

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      observers.push(lcpObserver)
    } catch (e) {
      console.warn('LCP not supported')
    }

    // CLS (Cumulative Layout Shift)
    let clsValue = 0
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
            callback({
              name: 'CLS',
              value: clsValue,
              rating: getRating('CLS', clsValue),
              delta: (entry as any).value,
              id: `cls-${Date.now()}`,
            })
          }
        }
      })

      clsObserver.observe({ entryTypes: ['layout-shift'] })
      observers.push(clsObserver)
    } catch (e) {
      console.warn('CLS not supported')
    }

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const firstEntry = entries[0] as any

        if (firstEntry.processingDuration) {
          callback({
            name: 'FID',
            value: (firstEntry as any).processingDuration,
            rating: getRating('FID', (firstEntry as any).processingDuration),
            delta: (firstEntry as any).processingDuration,
            id: `fid-${Date.now()}`,
          })
        }
      })

      fidObserver.observe({ entryTypes: ['first-input'] })
      observers.push(fidObserver)
    } catch (e) {
      console.warn('FID not supported')
    }

    return () => {
      observers.forEach(obs => obs.disconnect())
    }
  }, [callback])
}

/**
 * Avalia rating baseado em Web Vitals thresholds
 */
function getRating(
  metric: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; needsImprovement: number }> =
    {
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
    }

  const threshold = thresholds[metric]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

/**
 * Report Web Vitals para analytics
 */
export function reportWebVitals(vitals: WebVitals) {
  if (typeof window !== 'undefined') {
    console.log('[Web Vitals]', {
      metric: vitals.name,
      value: vitals.value.toFixed(2),
      rating: vitals.rating,
    })

    // Aqui você pode enviar para seu serviço de analytics
    // fetch('/api/vitals', { method: 'POST', body: JSON.stringify(vitals) })
  }
}
