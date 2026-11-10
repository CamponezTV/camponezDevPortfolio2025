import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'
import { LanguageProvider } from '@/context/language-context'

const wrapper = ({ children }: { children: React.ReactNode }) => <LanguageProvider language="pt">{children}</LanguageProvider>

describe('Footer', () => {
  it('shows the brand and a link for each section', () => {
    render(<Footer />, { wrapper })

    expect(screen.getAllByText('Arthur Camponez', { exact: false }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '/#about')
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '/#contact')
  })

  it('links to the real social profiles in a new tab', () => {
    render(<Footer />, { wrapper })

    const github = screen.getByRole('link', { name: 'GitHub' })
    expect(github).toHaveAttribute('href', 'https://github.com/CamponezTV')
    expect(github).toHaveAttribute('target', '_blank')
  })

  it('offers a way back to the top', () => {
    render(<Footer />, { wrapper })

    expect(screen.getByRole('link', { name: 'Voltar ao topo' })).toHaveAttribute('href', '#top')
  })
})
