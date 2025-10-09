import { vi } from "vitest"

export class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null
  readonly rootMargin: string
  readonly thresholds: ReadonlyArray<number>
  private readonly callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback
    this.root = options.root ?? null
    this.rootMargin = options.rootMargin ?? ""
    const threshold = options.threshold ?? 0
    this.thresholds = Array.isArray(threshold) ? threshold : [threshold]
  }

  observe = vi.fn<(target: Element) => void>()
  unobserve = vi.fn<(target: Element) => void>()
  disconnect = vi.fn<() => void>()
  takeRecords = vi.fn<() => IntersectionObserverEntry[]>(() => [])
}
