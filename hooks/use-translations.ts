'use client'

import { useLanguage } from '@/context/language-context'
import { getTranslations } from '@/config/translations'

/**
 * Hook customizado para acessar traduções
 * @returns Objeto com todas as traduções do idioma atual
 */
export function useTranslations() {
  try {
    const { language } = useLanguage()
    return getTranslations(language)
  } catch (error) {
    // Fallback para português se não estiver dentro do LanguageProvider
    return getTranslations('pt')
  }
}
