import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

describe('Card Component', () => {
  it('should render card with children', () => {
    render(
      <Card>
        <div data-testid="card-child">Card content</div>
      </Card>
    )
    expect(screen.getByTestId('card-child')).toBeInTheDocument()
  })

  it('should apply custom className to Card', () => {
    render(
      <Card className="custom-class" data-testid="card">
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })

  it('should render CardHeader', () => {
    render(
      <CardHeader data-testid="card-header">
        Header content
      </CardHeader>
    )
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
  })

  it('should render CardTitle', () => {
    render(<CardTitle>Test Title</CardTitle>)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render CardDescription', () => {
    render(<CardDescription>Test Description</CardDescription>)
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('should render CardContent', () => {
    render(
      <CardContent data-testid="card-content">
        Content
      </CardContent>
    )
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })

  it('should render CardFooter', () => {
    render(
      <CardFooter data-testid="card-footer">
        Footer
      </CardFooter>
    )
    expect(screen.getByTestId('card-footer')).toBeInTheDocument()
  })

  it('should render complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
