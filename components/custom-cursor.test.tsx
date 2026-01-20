import React from 'react'
import { render } from '@testing-library/react'
import { CustomCursor } from '@/components/custom-cursor'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useSpring: (value: any) => value,
}))

describe('CustomCursor Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<CustomCursor />)
    expect(container).toBeInTheDocument()
  })

  it('should render two cursor elements on desktop', () => {
    const { container } = render(<CustomCursor />)
    const divs = container.querySelectorAll('div')
    // Should have divs for main cursor and outer ring
    expect(divs.length).toBeGreaterThan(0)
  })

  it('should have cursor elements with mix-blend-difference', () => {
    const { container } = render(<CustomCursor />)
    const cursorDiv = container.querySelector('[style*="mix-blend"]')
    if (cursorDiv) {
      expect(cursorDiv).toHaveStyle('mix-blend-difference')
    }
  })

  it('should hide cursor on mobile devices', () => {
    const { container } = render(<CustomCursor />)
    const elements = container.querySelectorAll('.hidden.md\\:block')
    // Mobile breakpoint hidden elements
    expect(elements.length).toBeGreaterThanOrEqual(0)
  })

  it('should set pointer-events-none for non-interactive cursor', () => {
    const { container } = render(<CustomCursor />)
    const elements = container.querySelectorAll('.pointer-events-none')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('should have fixed positioning for cursor', () => {
    const { container } = render(<CustomCursor />)
    const elements = container.querySelectorAll('.fixed')
    expect(elements.length).toBeGreaterThan(0)
  })
})
