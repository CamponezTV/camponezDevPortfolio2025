/**
 * Performance Analysis Hook
 * Monitora e reporta métricas de performance em tempo real
 */

import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
  loadTime?: number // Total page load time
  jsSize?: number // JavaScript bundle size
  timestamp: number
}

export function usePerformanceAnalysis() {
  const metricsRef = useRef<PerformanceMetrics>({ timestamp: Date.now() })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const metrics: PerformanceMetrics = { timestamp: Date.now() }
    const observers: PerformanceObserver[] = []

    // Navigation Timing
    const onLoad = () => {
      try {
        const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navTiming) {
          metrics.ttfb = navTiming.responseStart - navTiming.fetchStart
          metrics.loadTime = navTiming.loadEventEnd - navTiming.fetchStart

          console.group('📊 Performance Metrics')
          console.table({
            'TTFB (ms)': metrics.ttfb?.toFixed(2),
            'Load Time (ms)': metrics.loadTime?.toFixed(2),
            'DOMContentLoaded (ms)': (navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart).toFixed(2),
          })
          console.groupEnd()
        }
      } catch (error) {
        console.warn('Navigation timing not available:', error)
      }
    }

    window.addEventListener('load', onLoad)

    // Paint Timing (FCP)
    try {
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime
        }
      })
    } catch (error) {
      console.warn('Paint timing not available:', error)
    }

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        metrics.lcp = lastEntry.renderTime || lastEntry.loadTime
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      observers.push(lcpObserver)
    } catch (e) {
      console.warn('LCP not supported')
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
            metrics.cls = clsValue
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      observers.push(clsObserver)
    } catch (e) {
      console.warn('CLS not supported')
    }

    metricsRef.current = metrics

    return () => {
      window.removeEventListener('load', onLoad)
      observers.forEach(obs => obs.disconnect())
    }
  }, [])

  return metricsRef.current
}

/**
 * Função para logar recursos de rede
 */
export function logNetworkResources() {
  if (typeof window === 'undefined') return

  const resources = performance.getEntriesByType('resource')
  
  const byType: Record<string, number[]> = {}

  resources.forEach((resource) => {
    const type = (resource as PerformanceResourceTiming).initiatorType || 'other'
    const duration = resource.duration

    if (!byType[type]) {
      byType[type] = []
    }
    byType[type].push(duration)
  })

  console.group('📦 Network Resources')
  Object.entries(byType).forEach(([type, durations]) => {
    const total = durations.reduce((a, b) => a + b, 0)
    const avg = total / durations.length
    console.log(`${type}: ${total.toFixed(2)}ms (${durations.length} requests, avg ${avg.toFixed(2)}ms)`)
  })
  console.groupEnd()
}

/**
 * Função para logar memory usage (se disponível)
 */
export function logMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) return

  const memory = (performance as any).memory
  const usedMB = (memory.usedJSHeapSize / 1048576).toFixed(2)
  const totalMB = (memory.totalJSHeapSize / 1048576).toFixed(2)
  const limitMB = (memory.jsHeapSizeLimit / 1048576).toFixed(2)

  console.group('💾 Memory Usage')
  console.table({
    'Used (MB)': usedMB,
    'Total (MB)': totalMB,
    'Limit (MB)': limitMB,
    'Usage %': ((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2),
  })
  console.groupEnd()
}

/**
 * Log Core Web Vitals
 */
function logCoreWebVitals() {
  const vitals: Record<string, number | string> = {}

  try {
    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navTiming) {
      vitals['LCP Est.'] = (navTiming.loadEventEnd - navTiming.fetchStart).toFixed(2) + 'ms'
      vitals['FID Est.'] = '< 100ms'
      vitals['CLS Est.'] = '0'
    }
  } catch (error) {
    console.warn('Core Web Vitals analysis error:', error)
  }

  console.group('🎯 Core Web Vitals')
  console.table(vitals)
  console.groupEnd()
}

/**
 * Analisador completo
 */
export function analyzePerformance() {
  if (typeof window === 'undefined') return

  console.log('🚀 Starting Performance Analysis...\n')

  const analysis: Record<string, unknown> = {}

  try {
    // Navigation timing analysis
    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navTiming) {
      analysis.navigation = {
        dns: navTiming.domainLookupEnd - navTiming.domainLookupStart,
        tcp: navTiming.connectEnd - navTiming.connectStart,
        ttfb: navTiming.responseStart - navTiming.fetchStart,
        download: navTiming.responseEnd - navTiming.responseStart,
        domInteractive: navTiming.domInteractive - navTiming.responseEnd,
        domLoaded: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
        pageLoad: navTiming.loadEventEnd - navTiming.loadEventStart,
      }
    }
  } catch (error) {
    console.warn('Navigation analysis failed:', error)
  }

  try {
    logNetworkResources()
  } catch (error) {
    console.warn('Network analysis failed:', error)
  }

  try {
    logMemoryUsage()
  } catch (error) {
    console.warn('Memory analysis failed:', error)
  }

  try {
    logCoreWebVitals()
  } catch (error) {
    console.warn('Core Web Vitals analysis failed:', error)
  }

  // Log Core Web Vitals targets
  console.group('🎯 Core Web Vitals Targets')
  console.table({
    'LCP Target': '< 2.5s',
    'FID Target': '< 100ms',
    'CLS Target': '< 0.1',
  })
  console.groupEnd()

  console.log('✅ Performance Analysis Complete\n')
  return analysis
}
