import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook } from "@testing-library/preact"
import { useDomElements } from "@/hooks/useDOMElements"

// Mock DOM elements
const mockButton = document.createElement("button")
const mockInput = document.createElement("input")

describe("useDomElements", () => {
  beforeEach(() => {
    // Clear any previous DOM state
    document.body.innerHTML = ""
    vi.clearAllMocks()

    // Mock console.warn to avoid noise in tests
    vi.spyOn(console, "warn").mockImplementation(() => {})
  })

  it("returns elements when all selectors match", () => {
    // Setup DOM
    mockButton.id = "test-button"
    mockInput.id = "test-input"
    document.body.appendChild(mockButton)
    document.body.appendChild(mockInput)

    const selectors = {
      button: "#test-button",
      input: "#test-input"
    }

    const { result } = renderHook(() => useDomElements(selectors))
    const elements = result.current.getElements()

    expect(elements).toEqual({
      button: mockButton,
      input: mockInput
    })
  })

  it("returns null when elements are missing", () => {
    const selectors = {
      button: "#missing-button",
      input: "#missing-input"
    }

    const { result } = renderHook(() => useDomElements(selectors))
    const elements = result.current.getElements()

    expect(elements).toBeNull()
    expect(console.warn).toHaveBeenCalledWith("DOM elements not found, retrying...")
  })

  it("caches elements and only queries once", () => {
    mockButton.id = "test-button"
    document.body.appendChild(mockButton)

    const selectors = { button: "#test-button" }
    const { result } = renderHook(() => useDomElements(selectors))

    // Call getElements multiple times
    const elements1 = result.current.getElements()
    const elements2 = result.current.getElements()

    expect(elements1).toBe(elements2) // Same object reference
    expect(elements1?.button).toBe(mockButton)
  })

  it("clears cache when clearCache is called", () => {
    mockButton.id = "test-button"
    document.body.appendChild(mockButton)

    const selectors = { button: "#test-button" }
    const { result } = renderHook(() => useDomElements(selectors))

    result.current.getElements()
    result.current.clearCache()

    // Remove element from DOM
    document.body.removeChild(mockButton)

    const elements2 = result.current.getElements()
    expect(elements2).toBeNull() // Should query again and find nothing
  })

  it("shows warning only once", () => {
    const selectors = { button: "#missing-button" }
    const { result } = renderHook(() => useDomElements(selectors))

    result.current.getElements()
    result.current.getElements()
    result.current.getElements()

    expect(console.warn).toHaveBeenCalledTimes(1)
  })

  it("retries after timeout when elements are missing", async () => {
    const selectors = { button: "#test-button" }
    const { result } = renderHook(() => useDomElements(selectors))

    // First call - no element
    const elements1 = result.current.getElements()
    expect(elements1).toBeNull()

    // Add element to DOM after timeout
    mockButton.id = "test-button"
    document.body.appendChild(mockButton)

    // Wait for timeout and cache clear
    await new Promise(resolve => setTimeout(resolve, 150))

    // Second call should find the element
    const elements2 = result.current.getElements()
    expect(elements2?.button).toBe(mockButton)
  })
})
