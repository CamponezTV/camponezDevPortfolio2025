import React from 'react'
import { render, screen } from '@testing-library/react'
import { Logo } from '@/components/logo'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}))

describe('Logo', () => {
  it('renders the brand logo file', () => {
    render(<Logo />)

    expect(screen.getByRole('img', { name: 'Arthur Camponez' })).toHaveAttribute('src', '/logo.png')
  })

  it('applies the requested size and class', () => {
    render(<Logo size={40} className="shrink-0" />)

    const logo = screen.getByRole('img', { name: 'Arthur Camponez' })
    expect(logo).toHaveAttribute('width', '40')
    expect(logo).toHaveAttribute('height', '40')
    expect(logo).toHaveClass('shrink-0')
  })
})
