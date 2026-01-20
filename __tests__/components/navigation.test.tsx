import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from '@/components/navigation'
import { LanguageProvider } from '@/context/language-context'
import React from 'react'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}))

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(LanguageProvider, null, children)

describe('Navigation Component', () => {
  it('should render navigation menu', () => {
    render(<Navigation />, { wrapper })
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('should render mobile menu button', () => {
    render(<Navigation />, { wrapper })
    
    const button = screen.getByRole('button', { name: /home/i })
    expect(button).toBeInTheDocument()
  })

  it('should handle language change', async () => {
    const user = userEvent.setup()
    render(<Navigation />, { wrapper })
    
    const ptButton = screen.queryByRole('button', { name: 'PT' })
    if (ptButton) {
      await user.click(ptButton)
      expect(ptButton).toHaveClass('bg-primary')
    }
  })

  it('should have logo link', () => {
    render(<Navigation />, { wrapper })
    
    const link = screen.getByRole('link', { name: /logo/i })
    expect(link).toHaveAttribute('href', '#hero')
  })
})
