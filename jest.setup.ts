import '@testing-library/jest-dom'

class IntersectionObserverStub {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: IntersectionObserverStub })
}
