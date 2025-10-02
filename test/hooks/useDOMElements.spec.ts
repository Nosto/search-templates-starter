import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook } from "@testing-library/preact"
import { useDOMElements, useAutocompleteDOMElements } from "@/hooks/useDOMElements"

// Mock DOM elements
const mockButton = document.createElement("button")
const mockInput = document.createElement("input")

describe("useDOMElements", () => {
  beforeEach(() => {
    // Clear any previous DOM state
    document.body.innerHTML = ""
    vi.clearAllMocks()

    // Mock console.warn to avoid noise in tests
    vi.spyOn(console, "warn").mockImplementation(() => {})
  })

  describe("useDOMElements generic hook", () => {
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

      const { result } = renderHook(() => useDOMElements(selectors))
      const elements = result.current.getElements()

      expect(elements).toEqual({
        button: mockButton,
        input: mockInput
      })
    })

    it("returns null when required elements are missing", () => {
      const selectors = {
        button: "#missing-button",
        input: "#missing-input"
      }

      const { result } = renderHook(() => useDOMElements(selectors))
      const elements = result.current.getElements()

      expect(elements).toBeNull()
      expect(console.warn).toHaveBeenCalledWith("Required DOM elements not found")
    })

    it("returns elements with nulls when required=false", () => {
      const selectors = {
        button: "#missing-button",
        input: "#missing-input"
      }

      const { result } = renderHook(() => useDOMElements(selectors, { required: false }))
      const elements = result.current.getElements()

      expect(elements).toEqual({
        button: null,
        input: null
      })
      expect(console.warn).not.toHaveBeenCalled()
    })

    it("uses custom warning message", () => {
      const selectors = {
        button: "#missing-button"
      }

      const customMessage = "Custom error message"
      const { result } = renderHook(() => useDOMElements(selectors, { warningMessage: customMessage }))

      result.current.getElements()
      expect(console.warn).toHaveBeenCalledWith(customMessage)
    })

    it("caches elements and only queries once", () => {
      mockButton.id = "test-button"
      document.body.appendChild(mockButton)

      const selectors = { button: "#test-button" }
      const { result } = renderHook(() => useDOMElements(selectors))

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
      const { result } = renderHook(() => useDOMElements(selectors))

      result.current.getElements()
      result.current.clearCache()

      // Remove element from DOM
      document.body.removeChild(mockButton)

      const elements2 = result.current.getElements()
      expect(elements2).toBeNull() // Should query again and find nothing
    })

    it("shows warning only once", () => {
      const selectors = { button: "#missing-button" }
      const { result } = renderHook(() => useDOMElements(selectors))

      result.current.getElements()
      result.current.getElements()
      result.current.getElements()

      expect(console.warn).toHaveBeenCalledTimes(1)
    })
  })

  describe("useAutocompleteDOMElements backward compatibility", () => {
    it("works with autocomplete-specific selectors", () => {
      // Setup autocomplete DOM elements
      const dropdown = document.createElement("div")
      const search = document.createElement("input")
      const form = document.createElement("form")

      dropdown.id = "dropdown"
      search.id = "search"
      form.id = "search-form"

      document.body.appendChild(dropdown)
      document.body.appendChild(search)
      document.body.appendChild(form)

      const { result } = renderHook(() => useAutocompleteDOMElements())
      const elements = result.current.getElements()

      expect(elements).toEqual({
        dropdownElement: dropdown,
        searchInput: search,
        searchForm: form
      })
    })

    it("returns null when autocomplete elements are missing", () => {
      const { result } = renderHook(() => useAutocompleteDOMElements())
      const elements = result.current.getElements()

      expect(elements).toBeNull()
      expect(console.warn).toHaveBeenCalledWith("Required DOM elements not found for autocomplete")
    })
  })
})
