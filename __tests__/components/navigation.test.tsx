import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from '@/components/navigation'
import { LanguageProvider } from '@/context/language-context'
import type { Language } from '@/config/translations'

const mockPathname = jest.fn(() => '/')

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

function renderNavigation(language: Language, pathname: string) {
  mockPathname.mockReturnValue(pathname)
  return render(
    <LanguageProvider language={language}>
      <Navigation />
    </LanguageProvider>,
  )
}

describe('Navigation', () => {
  it('links the logo to the top of the home page', () => {
    renderNavigation('pt', '/')

    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/#hero')
  })

  it('points section links to the home page of the current language', () => {
    renderNavigation('en', '/en/projects/ocl-advogados')

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/en#about')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/en#projects')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/en#contact')
  })

  it('links each language to the same page in that language', () => {
    renderNavigation('pt', '/projetos/ocl-advogados')

    const english = screen.getAllByRole('link', { name: 'en' })[0]
    expect(english).toHaveAttribute('href', '/en/projects/ocl-advogados')
    expect(english).toHaveAttribute('hreflang', 'en')
    expect(screen.getAllByRole('link', { name: 'pt' })[0]).toHaveAttribute('aria-current', 'true')
  })

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup()
    renderNavigation('pt', '/')

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }))
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Fechar menu' }))
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Fechar menu' })).not.toBeInTheDocument())
  })
})
