'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Language } from '@/config/translations'
import { DEFAULT_LANGUAGE } from '@/lib/i18n'

const LanguageContext = createContext<Language>(DEFAULT_LANGUAGE)

interface LanguageProviderProps {
  language: Language
  children: ReactNode
}

export function LanguageProvider({ language, children }: LanguageProviderProps) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>
}

export function useLanguage(): { language: Language } {
  return { language: useContext(LanguageContext) }
}
