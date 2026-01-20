import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    footer: ({ children }: any) => <footer>{children}</footer>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    p: ({ children }: any) => <p>{children}</p>,
    div: ({ children }: any) => <div>{children}</div>,
    a: ({ children }: any) => <a>{children}</a>,
    li: ({ children }: any) => <li>{children}</li>,
    button: ({ children }: any) => <button>{children}</button>,
  },
}))

// Mock do hook de traduções
jest.mock('@/hooks/use-translations', () => ({
  useTranslations: () => ({
    nav: {
      home: 'Início',
      about: 'Sobre',
      skills: 'Habilidades',
      projects: 'Projetos',
      contact: 'Contato',
    },
    footer: {
      brand: 'Arthur Camponez Marinho',
      description: 'Full Stack Developer passionate about creating extraordinary web experiences.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      rights: 'All rights reserved.',
      madeSince: 'Made in 2026',
    },
  }),
}))

// Now import after mocking
import { Footer } from '@/components/footer'

describe('Footer Component', () => {
  it('should render footer element', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('should display brand name', () => {
    render(<Footer />)
    expect(screen.getByText('Arthur Camponez Marinho')).toBeInTheDocument()
  })

  it('should render navigation items', () => {
    render(<Footer />)
    
    const navItems = ['Início', 'Sobre', 'Habilidades', 'Projetos', 'Contato']
    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('should render links in footer', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })
})
