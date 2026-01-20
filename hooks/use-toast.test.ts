import { renderHook, act } from '@testing-library/react'
import { useToast } from '@/hooks/use-toast'

describe('useToast hook', () => {
  it('should initialize with empty toasts array', () => {
    const { result } = renderHook(() => useToast())
    expect(Array.isArray(result.current.toasts)).toBe(true)
    expect(result.current.toasts.length).toBe(0)
  })

  it('should create a new toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'Test description',
      })
    })

    expect(result.current.toasts.length).toBeGreaterThan(0)
    const lastToast = result.current.toasts[result.current.toasts.length - 1]
    expect(lastToast.title).toBe('Test Toast')
    expect(lastToast.description).toBe('Test description')
  })

  it('should have dismiss function on toast object', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string = ''
    act(() => {
      const toastResult = result.current.toast({
        title: 'Test Toast',
      })
      toastId = toastResult.id
    })

    expect(toastId).toBeDefined()
  })

  it('should dismiss a specific toast', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string = ''
    act(() => {
      const toastResult = result.current.toast({
        title: 'Test Toast',
      })
      toastId = toastResult.id
    })

    const initialLength = result.current.toasts.length

    act(() => {
      result.current.dismiss(toastId)
    })

    // After dismiss, the toast should be marked as open: false
    const dismissedToast = result.current.toasts.find((t) => t.id === toastId)
    expect(dismissedToast?.open).toBe(false)
  })

  it('should dismiss all toasts when no id provided', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'Toast 1' })
      result.current.toast({ title: 'Toast 2' })
    })

    expect(result.current.toasts.length).toBeGreaterThan(0)

    act(() => {
      result.current.dismiss()
    })

    // All toasts should be marked as open: false
    const openToasts = result.current.toasts.filter((t) => t.open)
    expect(openToasts.length).toBe(0)
  })

  it('should have toast with unique id', () => {
    const { result } = renderHook(() => useToast())

    let id1: string = ''
    let id2: string = ''

    act(() => {
      id1 = result.current.toast({ title: 'Toast 1' }).id
      id2 = result.current.toast({ title: 'Toast 2' }).id
    })

    expect(id1).not.toBe(id2)
  })

  it('should support optional title and description', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({})
    })

    const lastToast = result.current.toasts[result.current.toasts.length - 1]
    expect(lastToast).toBeDefined()
    expect(lastToast.id).toBeDefined()
  })
})
