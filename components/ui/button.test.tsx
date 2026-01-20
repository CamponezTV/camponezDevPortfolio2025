import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should handle click events', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should support different variants', () => {
    render(
      <>
        <Button variant="default" data-testid="default-btn">Default</Button>
        <Button variant="secondary" data-testid="secondary-btn">Secondary</Button>
        <Button variant="destructive" data-testid="destructive-btn">Delete</Button>
        <Button variant="outline" data-testid="outline-btn">Outline</Button>
        <Button variant="ghost" data-testid="ghost-btn">Ghost</Button>
        <Button variant="link" data-testid="link-btn">Link</Button>
      </>
    )
    
    expect(screen.getByTestId('default-btn')).toBeInTheDocument()
    expect(screen.getByTestId('secondary-btn')).toBeInTheDocument()
    expect(screen.getByTestId('destructive-btn')).toBeInTheDocument()
    expect(screen.getByTestId('outline-btn')).toBeInTheDocument()
    expect(screen.getByTestId('ghost-btn')).toBeInTheDocument()
    expect(screen.getByTestId('link-btn')).toBeInTheDocument()
  })

  it('should support different sizes', () => {
    render(
      <>
        <Button size="sm" data-testid="sm-btn">Small</Button>
        <Button size="default" data-testid="default-size-btn">Default</Button>
        <Button size="lg" data-testid="lg-btn">Large</Button>
        <Button size="icon" data-testid="icon-btn">Icon</Button>
      </>
    )
    
    expect(screen.getByTestId('sm-btn')).toBeInTheDocument()
    expect(screen.getByTestId('default-size-btn')).toBeInTheDocument()
    expect(screen.getByTestId('lg-btn')).toBeInTheDocument()
    expect(screen.getByTestId('icon-btn')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class" data-testid="custom-btn">Custom</Button>)
    expect(screen.getByTestId('custom-btn')).toHaveClass('custom-class')
  })

  it('should accept type prop', () => {
    render(
      <>
        <Button type="button" data-testid="button-type">Button</Button>
        <Button type="submit" data-testid="submit-type">Submit</Button>
        <Button type="reset" data-testid="reset-type">Reset</Button>
      </>
    )
    
    expect(screen.getByTestId('button-type')).toHaveAttribute('type', 'button')
    expect(screen.getByTestId('submit-type')).toHaveAttribute('type', 'submit')
    expect(screen.getByTestId('reset-type')).toHaveAttribute('type', 'reset')
  })
})
