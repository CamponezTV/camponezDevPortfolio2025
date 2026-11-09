import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('framer-motion', () => ({
  motion: {
    header: ({ children }: any) => <header>{children}</header>,
    a: ({ children }: any) => <a>{children}</a>,
    li: ({ children }: any) => <li>{children}</li>,
    div: ({ children }: any) => <div>{children}</div>,
    button: ({ children }: any) => <button>{children}</button>,
    nav: ({ children }: any) => <nav>{children}</nav>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

jest.mock('@/hooks/use-translations', () => ({
  useTranslations: () => ({
    nav: {
      home: 'Início',
      about: 'Sobre',
      skills: 'Habilidades',
      projects: 'Projetos',
      contact: 'Contato',
    },
    common: {
      language: 'Idioma',
      portuguese: 'Português',
      english: 'English',
    },
  }),
}))

jest.mock('@/context/language-context', () => ({
  useLanguage: () => ({
    language: 'pt',
    setLanguage: jest.fn(),
  }),
}))

jest.mock('@/components/logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}))

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
  }),
}))

import { Navigation } from '@/components/navigation'

describe('Navigation Component', () => {
  it('should render navigation', () => {
    const { container } = render(<Navigation />)
    expect(container).toBeInTheDocument()
  })

  it('should render logo', () => {
    const { getByTestId } = render(<Navigation />)
    expect(getByTestId('logo')).toBeInTheDocument()
  })

  it('should render navigation items text', () => {
    render(<Navigation />)
    
    const navItems = ['Início', 'Sobre', 'Habilidades', 'Projetos', 'Contato']
    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })
})
