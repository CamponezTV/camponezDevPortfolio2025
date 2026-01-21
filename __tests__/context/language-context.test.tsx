import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage } from '@/context/language-context'
import React from 'react'

const TestComponent = () => {
  const { language, setLanguage } = useLanguage()
  return (
    <div>
      <span data-testid="language">{language}</span>
      <button onClick={() => setLanguage('en')}>Set English</button>
      <button onClick={() => setLanguage('pt')}>Set Portuguese</button>
    </div>
  )
}

describe('Language Context', () => {
  it('should provide language context', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    
    const language = screen.getByTestId('language')
    expect(language).toBeInTheDocument()
  })

  it('should update language state', async () => {
    const u = userEvent.setup()
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    
    const button = screen.getByRole('button', { name: /set english/i })
    await u.click(button)
    
    await waitFor(() => {
      const language = screen.getByTestId('language')
      expect(language.textContent).toBe('en')
    })
  })

  it('should persist language to localStorage', async () => {
    const u = userEvent.setup()
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    
    const button = screen.getByRole('button', { name: /set portuguese/i })
    await u.click(button)
    
    await waitFor(() => {
      expect(localStorage.getItem('language')).toBe('pt')
    })
  })
})
