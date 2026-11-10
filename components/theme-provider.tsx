'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import type { Language } from '@/config/translations'
import { LanguageProvider } from '@/context/language-context'
import { DEFAULT_LANGUAGE } from '@/lib/i18n'

interface AppProvidersProps extends ThemeProviderProps {
  language?: Language
}

export function ThemeProvider({ children, language = DEFAULT_LANGUAGE, ...props }: AppProvidersProps) {
  return (
    <NextThemesProvider {...props}>
      <LanguageProvider language={language}>{children}</LanguageProvider>
    </NextThemesProvider>
  )
}
