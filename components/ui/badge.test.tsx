import React from 'react'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge Component', () => {
  it('should render badge with children', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('should support different variants', () => {
    render(
      <>
        <Badge variant="default" data-testid="default-badge">Default</Badge>
        <Badge variant="secondary" data-testid="secondary-badge">Secondary</Badge>
        <Badge variant="destructive" data-testid="destructive-badge">Destructive</Badge>
        <Badge variant="outline" data-testid="outline-badge">Outline</Badge>
      </>
    )
    
    expect(screen.getByTestId('default-badge')).toBeInTheDocument()
    expect(screen.getByTestId('secondary-badge')).toBeInTheDocument()
    expect(screen.getByTestId('destructive-badge')).toBeInTheDocument()
    expect(screen.getByTestId('outline-badge')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Badge className="custom-class" data-testid="custom-badge">Custom</Badge>)
    expect(screen.getByTestId('custom-badge')).toHaveClass('custom-class')
  })

  it('should render multiple badges', () => {
    render(
      <>
        <Badge>Badge 1</Badge>
        <Badge>Badge 2</Badge>
        <Badge>Badge 3</Badge>
      </>
    )
    
    expect(screen.getByText('Badge 1')).toBeInTheDocument()
    expect(screen.getByText('Badge 2')).toBeInTheDocument()
    expect(screen.getByText('Badge 3')).toBeInTheDocument()
  })
})
