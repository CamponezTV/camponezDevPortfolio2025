import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { ConsentedTagManager } from '@/components/consented-tag-manager'
import { CONSENT_STORAGE_KEY, saveConsent } from '@/lib/consent'

jest.mock('@next/third-parties/google', () => ({
  GoogleTagManager: ({ gtmId }: { gtmId: string }) => <span data-testid="gtm">{gtmId}</span>,
}))

describe('ConsentedTagManager', () => {
  beforeEach(() => {
    localStorage.clear()
    window.dataLayer = []
  })

  it('does not load Google Tag Manager before the visitor accepts', () => {
    render(<ConsentedTagManager gtmId="GTM-TEST" />)

    expect(screen.queryByTestId('gtm')).not.toBeInTheDocument()
  })

  it('loads Google Tag Manager right after the visitor accepts', () => {
    render(<ConsentedTagManager gtmId="GTM-TEST" />)

    act(() => saveConsent('granted'))

    expect(screen.getByTestId('gtm')).toHaveTextContent('GTM-TEST')
  })

  it('keeps it off for visitors who declined', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'denied')
    render(<ConsentedTagManager gtmId="GTM-TEST" />)

    expect(screen.queryByTestId('gtm')).not.toBeInTheDocument()
  })
})
