import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook } from "@testing-library/preact"
import { usePopState } from "@/hooks/usePopState"

describe("usePopState", () => {
  let handler: () => void

  beforeEach(() => {
    handler = vi.fn()
  })

  it("should add popstate event listener on mount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener")

    renderHook(() => usePopState(handler))

    expect(addEventListenerSpy).toHaveBeenCalledWith("popstate", expect.any(Function))
  })

  it("should remove popstate event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener")

    const { unmount } = renderHook(() => usePopState(handler))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith("popstate", expect.any(Function))
  })

  it("should call handler when popstate event is triggered", () => {
    renderHook(() => usePopState(handler))

    window.dispatchEvent(new PopStateEvent("popstate"))

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it("should call handler multiple times when popstate is triggered multiple times", () => {
    renderHook(() => usePopState(handler))

    window.dispatchEvent(new PopStateEvent("popstate"))
    window.dispatchEvent(new PopStateEvent("popstate"))
    window.dispatchEvent(new PopStateEvent("popstate"))

    expect(handler).toHaveBeenCalledTimes(3)
  })

  it("should not call handler after unmount", () => {
    const { unmount } = renderHook(() => usePopState(handler))

    unmount()

    window.dispatchEvent(new PopStateEvent("popstate"))

    expect(handler).not.toHaveBeenCalled()
  })

  it("should work with handlers that access external state", () => {
    let counter = 0
    const handlerWithState = vi.fn(() => {
      counter++
    })

    renderHook(() => usePopState(handlerWithState))

    window.dispatchEvent(new PopStateEvent("popstate"))
    expect(counter).toBe(1)

    window.dispatchEvent(new PopStateEvent("popstate"))
    expect(counter).toBe(2)
  })

  it("should work with async handlers", async () => {
    const asyncHandler = vi.fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    renderHook(() => usePopState(asyncHandler))

    window.dispatchEvent(new PopStateEvent("popstate"))

    expect(asyncHandler).toHaveBeenCalledTimes(1)
    await asyncHandler.mock.results[0].value
  })
})
