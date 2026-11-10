import React from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsent } from '@/components/cookie-consent'
import { LanguageProvider } from '@/context/language-context'
import { CONSENT_STORAGE_KEY, openConsentPreferences } from '@/lib/consent'

function renderBanner() {
  return render(
    <LanguageProvider language="pt">
      <CookieConsent />
    </LanguageProvider>,
  )
}

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear()
    window.dataLayer = []
  })

  it('asks first-time visitors and remembers an acceptance', async () => {
    const user = userEvent.setup()
    renderBanner()

    await user.click(screen.getByRole('button', { name: 'Aceitar' }))

    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('granted')
    expect(screen.queryByRole('button', { name: 'Aceitar' })).not.toBeInTheDocument()
  })

  it('stays hidden for visitors who already chose', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'denied')
    renderBanner()

    expect(screen.queryByRole('heading', { name: 'Cookies e análise de visitas' })).not.toBeInTheDocument()
  })

  it('reopens from the cookie preferences link so the choice can change', async () => {
    const user = userEvent.setup()
    localStorage.setItem(CONSENT_STORAGE_KEY, 'granted')
    renderBanner()

    act(() => openConsentPreferences())
    await user.click(screen.getByRole('button', { name: 'Recusar' }))

    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('denied')
    expect(screen.queryByRole('button', { name: 'Recusar' })).not.toBeInTheDocument()
  })
})
