import React from 'react'
import { render, screen } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/context/language-context'

const CurrentLanguage = () => <span data-testid="language">{useLanguage().language}</span>

describe('LanguageProvider', () => {
  it('exposes the language chosen by the route', () => {
    render(
      <LanguageProvider language="en">
        <CurrentLanguage />
      </LanguageProvider>,
    )

    expect(screen.getByTestId('language')).toHaveTextContent('en')
  })

  it('falls back to Portuguese outside a provider', () => {
    render(<CurrentLanguage />)

    expect(screen.getByTestId('language')).toHaveTextContent('pt')
  })
})
