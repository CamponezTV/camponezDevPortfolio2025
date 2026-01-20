'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, detectBrowserLanguage } from '@/config/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Detecta idioma do navegador ou recupera do localStorage
    const savedLanguage = localStorage.getItem('language') as Language | null
    const detectedLanguage = savedLanguage || detectBrowserLanguage()
    
    setLanguageState(detectedLanguage)
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  // Evita hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Retorna um valor padrão em vez de lançar erro
    // Isso é importante para SSR/build time
    return {
      language: 'pt' as Language,
      setLanguage: () => {},
    }
  }
  return context
}
