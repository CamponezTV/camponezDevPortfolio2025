import { cn } from '@/lib/utils'

describe('Utils - cn function', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2', 'py-1')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
  })

  it('should remove conflicting Tailwind classes', () => {
    const result = cn('px-2 px-4')
    expect(result).toContain('px-4')
    expect(result).not.toContain('px-2')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('px-2', isActive && 'bg-blue-500')
    expect(result).toContain('px-2')
    expect(result).toContain('bg-blue-500')
  })

  it('should handle undefined and false values', () => {
    const result = cn('px-2', undefined, false, 'py-1')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
  })

  it('should handle empty strings', () => {
    const result = cn('px-2', '', 'py-1')
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
  })

  it('should handle array and object inputs', () => {
    const result = cn(['px-2', 'py-1'], { 'bg-red-500': true })
    expect(result).toContain('px-2')
    expect(result).toContain('py-1')
    expect(result).toContain('bg-red-500')
  })

  it('should work with complex Tailwind utilities', () => {
    const result = cn(
      'flex items-center justify-between',
      'px-4 py-2',
      'rounded-lg',
      'bg-white dark:bg-slate-900'
    )
    expect(result).toContain('flex')
    expect(result).toContain('items-center')
    expect(result).toContain('justify-between')
    expect(result).toContain('px-4')
    expect(result).toContain('py-2')
    expect(result).toContain('rounded-lg')
  })
})
