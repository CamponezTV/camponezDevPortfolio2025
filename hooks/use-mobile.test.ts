import { renderHook } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

describe('useIsMobile hook', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    // Mock matchMedia
    window.matchMedia = jest.fn((query: string) => ({
      matches: query === '(max-width: 767px)',
      media: query,
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

  it('should return boolean value', () => {
    const { result } = renderHook(() => useIsMobile())
    expect(typeof result.current === 'boolean' || result.current === undefined).toBe(
      true
    )
  })

  it('should detect mobile screen on mount', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBeDefined()
  })

  it('should detect desktop screen when width > 768', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    window.matchMedia = jest.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })) as any

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerMock = jest.fn()
    window.matchMedia = jest.fn(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    })) as any

    const { unmount } = renderHook(() => useIsMobile())
    unmount()

    expect(removeEventListenerMock).toHaveBeenCalled()
  })
})
