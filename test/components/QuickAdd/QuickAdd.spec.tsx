import { describe, it, expect, vi } from "vitest"
import { startViewTransition } from "@/utils/viewTransition"

describe("View Transition Utility", () => {
  it("calls document.startViewTransition when available", () => {
    const mockCallback = vi.fn()
    const mockStartViewTransition = vi.fn((cb: () => void) => cb())
    document.startViewTransition = mockStartViewTransition

    startViewTransition(mockCallback)

    expect(mockStartViewTransition).toHaveBeenCalled()
    expect(mockCallback).toHaveBeenCalled()
  })

  it("calls callback directly when document.startViewTransition is not available", () => {
    const originalStartViewTransition = document.startViewTransition
    // @ts-expect-error - testing missing API
    delete document.startViewTransition

    const mockCallback = vi.fn()
    startViewTransition(mockCallback)

    expect(mockCallback).toHaveBeenCalled()

    document.startViewTransition = originalStartViewTransition
  })

  it("handles async callbacks", async () => {
    const mockCallback = vi.fn(async () => {
      await Promise.resolve()
    })
    const mockStartViewTransition = vi.fn((cb: () => void) => cb())
    document.startViewTransition = mockStartViewTransition

    startViewTransition(mockCallback)

    expect(mockStartViewTransition).toHaveBeenCalled()
    await mockCallback()
    expect(mockCallback).toHaveBeenCalled()
  })
})

describe("Product View Transition Name", () => {
  it("generates correct view-transition-name from product ID", () => {
    const productId = "test-product-123"
    const expectedTransitionName = `product-${productId}`

    expect(expectedTransitionName).toBe("product-test-product-123")
  })

  it("handles numeric product IDs", () => {
    const productId = 12345
    const expectedTransitionName = `product-${productId}`

    expect(expectedTransitionName).toBe("product-12345")
  })
})
