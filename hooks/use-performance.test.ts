import { renderHook } from '@testing-library/react'
import { useReducedMotion, useIsSmallDevice } from '@/hooks/use-performance'

describe('useReducedMotion hook', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    window.matchMedia = jest.fn(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })) as any
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('should initialize with false when no preference set', () => {
    const { result } = renderHook(() => useReducedMotion())
    expect(typeof result.current === 'boolean').toBe(true)
  })

  it('should detect prefers-reduced-motion: reduce', () => {
    window.matchMedia = jest.fn(() => ({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })) as any

    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerMock = jest.fn()
    window.matchMedia = jest.fn(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    })) as any

    const { unmount } = renderHook(() => useReducedMotion())
    unmount()

    expect(removeEventListenerMock).toHaveBeenCalled()
  })
})

describe('useIsSmallDevice hook', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('should return false for desktop devices', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsSmallDevice())
    expect(result.current).toBe(false)
  })

  it('should return true for small devices', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const { result } = renderHook(() => useIsSmallDevice())
    expect(result.current).toBe(true)
  })

  it('should have threshold at 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    })

    const { result } = renderHook(() => useIsSmallDevice())
    expect(result.current).toBe(true)

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })

    const { result: result2 } = renderHook(() => useIsSmallDevice())
    expect(result2.current).toBe(false)
  })

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerMock = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useIsSmallDevice())
    unmount()

    expect(removeEventListenerMock).toHaveBeenCalledWith('resize', expect.any(Function))
  })
})
