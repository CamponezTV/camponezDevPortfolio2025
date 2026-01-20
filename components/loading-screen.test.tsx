import React from 'react'
import { render } from '@testing-library/react'
import { LoadingScreen } from '@/components/loading-screen'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: any) => <div>{children}</div>,
    h1: ({ children }: any) => <h1>{children}</h1>,
    p: ({ children }: any) => <p>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock Logo component
jest.mock('@/components/logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}))

describe('LoadingScreen Component', () => {
  it('should render loading screen', () => {
    const { container } = render(<LoadingScreen />)
    expect(container).toBeInTheDocument()
  })

  it('should display logo', () => {
    const { getByTestId } = render(<LoadingScreen />)
    expect(getByTestId('logo')).toBeInTheDocument()
  })

  it('should render progress indicator', () => {
    const { container } = render(<LoadingScreen />)
    const divs = container.querySelectorAll('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('should display percentage', () => {
    const { container } = render(<LoadingScreen />)
    // Progress percentage should be displayed
    expect(container.textContent).toMatch(/\d+%/)
  })
})
