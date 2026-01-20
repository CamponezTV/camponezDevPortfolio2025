import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Logo } from '@/components/logo'
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

describe('Logo Component', () => {
  it('should render logo image', () => {
    render(<Logo size="md" />)
    
    const img = screen.getByAltText('Logo')
    expect(img).toBeInTheDocument()
  })

  it('should apply correct size classes', () => {
    const { rerender } = render(<Logo size="sm" />)
    let img = screen.getByAltText('Logo')
    expect(img).toHaveAttribute('width', '32')

    rerender(<Logo size="lg" />)
    img = screen.getByAltText('Logo')
    expect(img).toHaveAttribute('width', '64')
  })

  it('should apply custom className', () => {
    const { container } = render(<Logo className="custom-class" />)
    const div = container.querySelector('.custom-class')
    expect(div).toBeInTheDocument()
  })

  it('should render with priority prop', () => {
    render(<Logo size="md" />)
    const img = screen.getByAltText('Logo')
    expect(img).toBeInTheDocument()
  })
})
