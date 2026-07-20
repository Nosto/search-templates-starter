import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { renderHook } from "@testing-library/preact"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { setupAutocompleteSearch } from "../utils/autocompleteSearch"

const DEBOUNCE_DELAY = 500

describe("useDebouncedSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("does not search the query restored from the URL on mount", async () => {
    const { search, wrapper } = setupAutocompleteSearch()

    renderHook(() => useDebouncedSearch({ input: "shoes" }), { wrapper })
    await vi.advanceTimersByTimeAsync(DEBOUNCE_DELAY)

    expect(search).not.toHaveBeenCalled()
  })

  it("searches after the debounce delay once the user changes the input", async () => {
    const { search, wrapper } = setupAutocompleteSearch()

    const { rerender } = renderHook(({ input }) => useDebouncedSearch({ input }), {
      wrapper,
      initialProps: { input: "" }
    })

    rerender({ input: "shirts" })
    expect(search).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(DEBOUNCE_DELAY)

    expect(search).toHaveBeenCalledTimes(1)
    expect(search).toHaveBeenCalledWith(expect.objectContaining({ query: "shirts" }), expect.anything())
  })

  it("does not search while the input is shorter than the minimum query length", async () => {
    const { search, wrapper } = setupAutocompleteSearch()

    const { rerender } = renderHook(({ input }) => useDebouncedSearch({ input }), {
      wrapper,
      initialProps: { input: "" }
    })

    rerender({ input: "s" })
    await vi.advanceTimersByTimeAsync(DEBOUNCE_DELAY)

    expect(search).not.toHaveBeenCalled()
  })

  it("debounces rapidly changing input into a single search", async () => {
    const { search, wrapper } = setupAutocompleteSearch()

    const { rerender } = renderHook(({ input }) => useDebouncedSearch({ input }), {
      wrapper,
      initialProps: { input: "" }
    })

    rerender({ input: "sh" })
    await vi.advanceTimersByTimeAsync(200)
    rerender({ input: "sho" })
    await vi.advanceTimersByTimeAsync(200)
    rerender({ input: "shoe" })
    await vi.advanceTimersByTimeAsync(DEBOUNCE_DELAY)

    expect(search).toHaveBeenCalledTimes(1)
    expect(search).toHaveBeenCalledWith(expect.objectContaining({ query: "shoe" }), expect.anything())
  })
})
