import React from 'react'
import { render } from '@testing-library/react'
import { SmoothScroll } from '@/components/smooth-scroll'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useScroll: () => ({
    scrollYProgress: 0,
  }),
  useSpring: (value: any) => value,
}))

describe('SmoothScroll Component', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <SmoothScroll>
        <div>Test Content</div>
      </SmoothScroll>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should render progress bar', () => {
    const { container } = render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    )
    const progressBar = container.querySelector('.fixed')
    expect(progressBar).toBeInTheDocument()
  })

  it('should have progress bar with primary background', () => {
    const { container } = render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    )
    const progressBar = container.querySelector('.bg-primary')
    expect(progressBar).toBeInTheDocument()
  })

  it('should have progress bar at top of viewport', () => {
    const { container } = render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    )
    const progressBar = container.querySelector('.top-0.left-0')
    expect(progressBar).toBeInTheDocument()
  })

  it('should have progress bar with correct height', () => {
    const { container } = render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    )
    const progressBar = container.querySelector('.h-1')
    expect(progressBar).toBeInTheDocument()
  })

  it('should render with relative positioning container', () => {
    const { container } = render(
      <SmoothScroll>
        <div>Content</div>
      </SmoothScroll>
    )
    const wrapper = container.querySelector('.relative')
    expect(wrapper).toBeInTheDocument()
  })

  it('should accept multiple children', () => {
    const { getByText } = render(
      <SmoothScroll>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </SmoothScroll>
    )
    expect(getByText('Child 1')).toBeInTheDocument()
    expect(getByText('Child 2')).toBeInTheDocument()
    expect(getByText('Child 3')).toBeInTheDocument()
  })
})
