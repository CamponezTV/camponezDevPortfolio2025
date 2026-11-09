'use client'

import { useLanguage } from '@/context/language-context'
import { getTranslations } from '@/config/translations'

export function useTranslations() {
  const { language } = useLanguage()
  return getTranslations(language)
}
