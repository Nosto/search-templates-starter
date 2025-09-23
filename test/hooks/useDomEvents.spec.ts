import { renderHook } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { useDomEvents } from "@/hooks/useDomEvents"

describe("useDomEvents", () => {
  let element: HTMLElement
  let mockOnClick: ReturnType<typeof vi.fn>
  let mockOnInput: ReturnType<typeof vi.fn>
  let mockOnFocus: ReturnType<typeof vi.fn>
  let mockOnBlur: ReturnType<typeof vi.fn>
  let mockOnSubmit: ReturnType<typeof vi.fn>

  beforeEach(() => {
    // Create a fresh DOM element for each test
    element = document.createElement("div")
    document.body.appendChild(element)

    // Create fresh mock functions for each test
    mockOnClick = vi.fn()
    mockOnInput = vi.fn()
    mockOnFocus = vi.fn()
    mockOnBlur = vi.fn()
    mockOnSubmit = vi.fn()

    // Clear any existing event listeners
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up DOM
    document.body.removeChild(element)
  })

  describe("event attachment", () => {
    it("should attach click event listener when onClick is provided", () => {
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")

      renderHook(() => useDomEvents(element, { onClick: mockOnClick }))

      expect(addEventListenerSpy).toHaveBeenCalledWith("click", mockOnClick)
    })

    it("should attach input event listener when onInput is provided", () => {
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")

      renderHook(() => useDomEvents(element, { onInput: mockOnInput }))

      expect(addEventListenerSpy).toHaveBeenCalledWith("input", mockOnInput)
    })

    it("should attach focus event listener when onFocus is provided", () => {
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")

      renderHook(() => useDomEvents(element, { onFocus: mockOnFocus }))

      expect(addEventListenerSpy).toHaveBeenCalledWith("focus", mockOnFocus)
    })

    it("should attach blur event listener when onBlur is provided", () => {
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")

      renderHook(() => useDomEvents(element, { onBlur: mockOnBlur }))

      expect(addEventListenerSpy).toHaveBeenCalledWith("blur", mockOnBlur)
    })

    it("should attach submit event listener when onSubmit is provided", () => {
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")

      renderHook(() => useDomEvents(element, { onSubmit: mockOnSubmit }))

      expect(addEventListenerSpy).toHaveBeenCalledWith("submit", mockOnSubmit)
    })

    it("should attach multiple event listeners when multiple handlers are provided", () => {
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")

      renderHook(() =>
        useDomEvents(element, {
          onClick: mockOnClick,
          onInput: mockOnInput,
          onFocus: mockOnFocus
        })
      )

      expect(addEventListenerSpy).toHaveBeenCalledWith("click", mockOnClick)
      expect(addEventListenerSpy).toHaveBeenCalledWith("input", mockOnInput)
      expect(addEventListenerSpy).toHaveBeenCalledWith("focus", mockOnFocus)
      expect(addEventListenerSpy).toHaveBeenCalledTimes(3)
    })

    it("should not attach any event listeners when no handlers are provided", () => {
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")

      renderHook(() => useDomEvents(element, {}))

      expect(addEventListenerSpy).not.toHaveBeenCalled()
    })

    it("should not attach event listeners when element is null", () => {
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")

      renderHook(() => useDomEvents(null, { onClick: mockOnClick }))

      expect(addEventListenerSpy).not.toHaveBeenCalled()
    })
  })

  describe("event handler execution", () => {
    it("should call onClick handler when click event is fired", () => {
      renderHook(() => useDomEvents(element, { onClick: mockOnClick }))

      const clickEvent = new Event("click")
      element.dispatchEvent(clickEvent)

      expect(mockOnClick).toHaveBeenCalledTimes(1)
      expect(mockOnClick).toHaveBeenCalledWith(clickEvent)
    })

    it("should call onInput handler when input event is fired", () => {
      renderHook(() => useDomEvents(element, { onInput: mockOnInput }))

      const inputEvent = new Event("input")
      element.dispatchEvent(inputEvent)

      expect(mockOnInput).toHaveBeenCalledTimes(1)
      expect(mockOnInput).toHaveBeenCalledWith(inputEvent)
    })

    it("should call onFocus handler when focus event is fired", () => {
      renderHook(() => useDomEvents(element, { onFocus: mockOnFocus }))

      const focusEvent = new Event("focus")
      element.dispatchEvent(focusEvent)

      expect(mockOnFocus).toHaveBeenCalledTimes(1)
      expect(mockOnFocus).toHaveBeenCalledWith(focusEvent)
    })

    it("should call onBlur handler when blur event is fired", () => {
      renderHook(() => useDomEvents(element, { onBlur: mockOnBlur }))

      const blurEvent = new Event("blur")
      element.dispatchEvent(blurEvent)

      expect(mockOnBlur).toHaveBeenCalledTimes(1)
      expect(mockOnBlur).toHaveBeenCalledWith(blurEvent)
    })

    it("should call onSubmit handler when submit event is fired", () => {
      renderHook(() => useDomEvents(element, { onSubmit: mockOnSubmit }))

      const submitEvent = new Event("submit")
      element.dispatchEvent(submitEvent)

      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(submitEvent)
    })

    it("should call multiple handlers when multiple events are fired", () => {
      renderHook(() =>
        useDomEvents(element, {
          onClick: mockOnClick,
          onInput: mockOnInput
        })
      )

      const clickEvent = new Event("click")
      const inputEvent = new Event("input")

      element.dispatchEvent(clickEvent)
      element.dispatchEvent(inputEvent)

      expect(mockOnClick).toHaveBeenCalledTimes(1)
      expect(mockOnClick).toHaveBeenCalledWith(clickEvent)
      expect(mockOnInput).toHaveBeenCalledTimes(1)
      expect(mockOnInput).toHaveBeenCalledWith(inputEvent)
    })
  })

  describe("cleanup and re-attachment", () => {
    it("should remove event listeners when component unmounts", () => {
      const removeEventListenerSpy = vi.spyOn(element, "removeEventListener")

      const { unmount } = renderHook(() => useDomEvents(element, { onClick: mockOnClick }))

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith("click", mockOnClick)
    })

    it("should remove all event listeners when component unmounts", () => {
      const removeEventListenerSpy = vi.spyOn(element, "removeEventListener")

      const { unmount } = renderHook(() =>
        useDomEvents(element, {
          onClick: mockOnClick,
          onInput: mockOnInput,
          onFocus: mockOnFocus
        })
      )

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith("click", mockOnClick)
      expect(removeEventListenerSpy).toHaveBeenCalledWith("input", mockOnInput)
      expect(removeEventListenerSpy).toHaveBeenCalledWith("focus", mockOnFocus)
      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3)
    })

    it("should not call handlers after cleanup", () => {
      const { unmount } = renderHook(() => useDomEvents(element, { onClick: mockOnClick }))

      unmount()

      const clickEvent = new Event("click")
      element.dispatchEvent(clickEvent)

      expect(mockOnClick).not.toHaveBeenCalled()
    })

    it("should re-attach event listeners when handlers change", () => {
      const newMockOnClick = vi.fn()
      const addEventListenerSpy = vi.spyOn(element, "addEventListener")
      const removeEventListenerSpy = vi.spyOn(element, "removeEventListener")

      const { rerender } = renderHook(({ handler }) => useDomEvents(element, { onClick: handler }), {
        initialProps: { handler: mockOnClick }
      })

      // Clear spies to focus on rerender behavior
      addEventListenerSpy.mockClear()
      removeEventListenerSpy.mockClear()

      rerender({ handler: newMockOnClick })

      expect(removeEventListenerSpy).toHaveBeenCalledWith("click", mockOnClick)
      expect(addEventListenerSpy).toHaveBeenCalledWith("click", newMockOnClick)
    })

    it("should re-attach event listeners when element changes", () => {
      const newElement = document.createElement("div")
      document.body.appendChild(newElement)

      const addEventListenerSpy = vi.spyOn(element, "addEventListener")
      const newAddEventListenerSpy = vi.spyOn(newElement, "addEventListener")
      const removeEventListenerSpy = vi.spyOn(element, "removeEventListener")

      const { rerender } = renderHook(({ el }) => useDomEvents(el, { onClick: mockOnClick }), {
        initialProps: { el: element }
      })

      // Clear spies to focus on rerender behavior
      addEventListenerSpy.mockClear()
      removeEventListenerSpy.mockClear()

      rerender({ el: newElement })

      expect(removeEventListenerSpy).toHaveBeenCalledWith("click", mockOnClick)
      expect(newAddEventListenerSpy).toHaveBeenCalledWith("click", mockOnClick)

      // Clean up
      document.body.removeChild(newElement)
    })

    it("should remove listeners when element becomes null", () => {
      const removeEventListenerSpy = vi.spyOn(element, "removeEventListener")

      const { rerender } = renderHook(({ el }) => useDomEvents(el, { onClick: mockOnClick }), {
        initialProps: { el: element }
      })

      removeEventListenerSpy.mockClear()

      rerender({ el: null as HTMLElement | null })

      expect(removeEventListenerSpy).toHaveBeenCalledWith("click", mockOnClick)
    })

    it("should not throw error when element becomes null on cleanup", () => {
      const { rerender } = renderHook(({ el }) => useDomEvents(el, { onClick: mockOnClick }), {
        initialProps: { el: element }
      })

      expect(() => {
        rerender({ el: null as HTMLElement | null })
      }).not.toThrow()
    })
  })
})
