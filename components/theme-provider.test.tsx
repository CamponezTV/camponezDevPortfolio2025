import React from 'react'
import { render } from '@testing-library/react'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: any) => <>{children}</>,
}))

import { ThemeProvider } from '@/components/theme-provider'

describe('ThemeProvider Component', () => {
  it('should render children', () => {
    const { getByText } = render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>Test Content</div>
      </ThemeProvider>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should wrap children', () => {
    const { container } = render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>Content</div>
      </ThemeProvider>
    )
    expect(container).toBeInTheDocument()
  })

  it('should support multiple children', () => {
    const { getByText } = render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>Child 1</div>
        <div>Child 2</div>
      </ThemeProvider>
    )
    expect(getByText('Child 1')).toBeInTheDocument()
    expect(getByText('Child 2')).toBeInTheDocument()
  })
})
