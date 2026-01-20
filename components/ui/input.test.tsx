import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from '@/components/ui/input'

describe('Input Component', () => {
  it('should render input element', () => {
    render(<Input data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('should accept placeholder prop', () => {
    render(<Input placeholder="Enter text" data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toHaveAttribute('placeholder', 'Enter text')
  })

  it('should accept type prop', () => {
    render(<Input type="email" data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toHaveAttribute('type', 'email')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toBeDisabled()
  })

  it('should support different input types', () => {
    render(
      <>
        <Input type="text" data-testid="text-input" />
        <Input type="email" data-testid="email-input" />
        <Input type="password" data-testid="password-input" />
        <Input type="number" data-testid="number-input" />
      </>
    )
    
    expect(screen.getByTestId('text-input')).toHaveAttribute('type', 'text')
    expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email')
    expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('number-input')).toHaveAttribute('type', 'number')
  })

  it('should apply custom className', () => {
    render(<Input className="custom-class" data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toHaveClass('custom-class')
  })

  it('should handle value prop', () => {
    render(<Input value="test value" readOnly data-testid="test-input" />)
    expect(screen.getByTestId('test-input')).toHaveValue('test value')
  })
})
