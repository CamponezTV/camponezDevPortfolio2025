import { renderHook } from '@testing-library/react'
import { useTranslations } from '@/hooks/use-translations'
import { LanguageProvider } from '@/context/language-context'
import React from 'react'

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(LanguageProvider, null, children)

describe('useTranslations', () => {
  it('should return translations object', () => {
    const { result } = renderHook(() => useTranslations(), { wrapper })
    
    expect(result.current).toBeDefined()
    expect(typeof result.current).toBe('object')
  })

  it('should have nav translations', () => {
    const { result } = renderHook(() => useTranslations(), { wrapper })
    
    expect(result.current.nav).toBeDefined()
    expect(result.current.nav.home).toBeDefined()
    expect(result.current.nav.about).toBeDefined()
    expect(result.current.nav.skills).toBeDefined()
  })

  it('should have skills translations', () => {
    const { result } = renderHook(() => useTranslations(), { wrapper })
    
    expect(result.current.skills).toBeDefined()
    expect(result.current.skills.title).toBeDefined()
    expect(result.current.skills.skillsList).toBeDefined()
  })

  it('should have projects translations', () => {
    const { result } = renderHook(() => useTranslations(), { wrapper })
    
    expect(result.current.projects).toBeDefined()
    expect(result.current.projects.items).toBeDefined()
  })
})
