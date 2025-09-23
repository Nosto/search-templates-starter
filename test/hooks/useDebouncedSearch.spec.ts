import { renderHook } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch"
import { useActions } from "@nosto/search-js/preact/hooks"
import { useAutocompleteConfig } from "@nosto/search-js/preact/common"

// Mock the Nosto hooks
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useActions: vi.fn()
}))

vi.mock("@nosto/search-js/preact/common", () => ({
  useAutocompleteConfig: vi.fn()
}))

describe("useDebouncedSearch", () => {
  let mockNewSearch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    // Create fresh mock functions for each test
    mockNewSearch = vi.fn()

    // Mock the hook functions with complete return objects
    vi.mocked(useActions).mockReturnValue({
      newSearch: mockNewSearch,
      updateSearch: vi.fn(),
      toggleProductFilter: vi.fn(),
      replaceFilter: vi.fn(),
      clearFilters: vi.fn(),
      resetPagination: vi.fn(),
      setPagination: vi.fn(),
      setPageSize: vi.fn(),
      setSorting: vi.fn()
    } as any)

    vi.mocked(useAutocompleteConfig).mockReturnValue({
      minQueryLength: 3,
      debounceDelay: 300,
      pageType: "search",
      memoryCache: true,
      historyEnabled: true,
      historySize: 10,
      hitDecorators: [],
      queryModifications: vi.fn()
    } as any)

    // Clear all mocks and timers
    vi.clearAllMocks()
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("debounced search behavior", () => {
    it("should call newSearch after debounce delay when input meets minimum length", () => {
      renderHook(() => useDebouncedSearch({ input: "test query" }))

      expect(mockNewSearch).not.toHaveBeenCalled()

      // Fast-forward time by the debounce delay
      vi.advanceTimersByTime(300)

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "test query" })
    })

    it("should not call newSearch if input is shorter than minQueryLength", () => {
      renderHook(() => useDebouncedSearch({ input: "ab" })) // Less than minQueryLength (3)

      vi.advanceTimersByTime(300)

      expect(mockNewSearch).not.toHaveBeenCalled()
    })

    it("should not call newSearch if input is empty", () => {
      renderHook(() => useDebouncedSearch({ input: "" }))

      vi.advanceTimersByTime(300)

      expect(mockNewSearch).not.toHaveBeenCalled()
    })

    it("should cancel previous timeout and create new one on rapid input changes", () => {
      const { rerender } = renderHook(({ input }) => useDebouncedSearch({ input }), {
        initialProps: { input: "first" }
      })

      // First input
      vi.advanceTimersByTime(100)
      expect(mockNewSearch).not.toHaveBeenCalled()

      // Change input before timeout completes
      rerender({ input: "second" })
      vi.advanceTimersByTime(200) // Total 300ms from first input

      // Should not have called newSearch yet (timeout was reset)
      expect(mockNewSearch).not.toHaveBeenCalled()

      // Complete the new timeout
      vi.advanceTimersByTime(100) // Total 300ms from second input

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "second" })
    })

    it("should only trigger newSearch once for the final input after rapid changes", () => {
      const { rerender } = renderHook(({ input }) => useDebouncedSearch({ input }), {
        initialProps: { input: "first" }
      })

      // Simulate rapid typing
      rerender({ input: "second" })
      vi.advanceTimersByTime(50)

      rerender({ input: "third" })
      vi.advanceTimersByTime(50)

      rerender({ input: "fourth" })
      vi.advanceTimersByTime(50)

      rerender({ input: "final query" })

      // Fast-forward through all the delays
      vi.advanceTimersByTime(300)

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "final query" })
    })

    it("should respect custom minQueryLength configuration", () => {
      vi.mocked(useAutocompleteConfig).mockReturnValue({
        minQueryLength: 5,
        debounceDelay: 300,
        pageType: "search",
        memoryCache: true,
        historyEnabled: true,
        historySize: 10,
        hitDecorators: [],
        queryModifications: vi.fn()
      } as any)

      const { rerender } = renderHook(
        ({ input }) => useDebouncedSearch({ input }),
        { initialProps: { input: "test" } } // 4 characters, less than minQueryLength (5)
      )

      vi.advanceTimersByTime(300)
      expect(mockNewSearch).not.toHaveBeenCalled()

      // Now provide input that meets the minimum length
      rerender({ input: "testing" }) // 7 characters, meets minQueryLength (5)
      vi.advanceTimersByTime(300)

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "testing" })
    })

    it("should respect custom debounceDelay configuration", () => {
      vi.mocked(useAutocompleteConfig).mockReturnValue({
        minQueryLength: 3,
        debounceDelay: 500, // Custom delay
        pageType: "search",
        memoryCache: true,
        historyEnabled: true,
        historySize: 10,
        hitDecorators: [],
        queryModifications: vi.fn()
      } as any)

      renderHook(() => useDebouncedSearch({ input: "test query" }))

      // Should not trigger at the default 300ms
      vi.advanceTimersByTime(300)
      expect(mockNewSearch).not.toHaveBeenCalled()

      // Should trigger at the custom 500ms
      vi.advanceTimersByTime(200) // Total 500ms
      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "test query" })
    })
  })

  describe("cleanup behavior", () => {
    it("should clear timeout when component unmounts", () => {
      const { unmount } = renderHook(() => useDebouncedSearch({ input: "test query" }))

      // Unmount before timeout completes
      vi.advanceTimersByTime(100)
      unmount()

      // Complete the original timeout duration
      vi.advanceTimersByTime(200)

      expect(mockNewSearch).not.toHaveBeenCalled()
    })

    it("should clear timeout when input changes from valid to invalid length", () => {
      const { rerender } = renderHook(({ input }) => useDebouncedSearch({ input }), {
        initialProps: { input: "valid query" }
      })

      // Start with valid input
      vi.advanceTimersByTime(100)

      // Change to invalid length input
      rerender({ input: "ab" }) // Less than minQueryLength (3)

      // Complete the original timeout
      vi.advanceTimersByTime(200)

      expect(mockNewSearch).not.toHaveBeenCalled()
    })

    it("should not create timeout for input that doesn't meet minimum length", () => {
      const setTimeoutSpy = vi.spyOn(global, "setTimeout")

      renderHook(() => useDebouncedSearch({ input: "ab" })) // Less than minQueryLength (3)

      expect(setTimeoutSpy).not.toHaveBeenCalled()
    })

    it("should clear timeout when newSearch function reference changes", () => {
      const newMockNewSearch = vi.fn()

      // First render with initial newSearch
      const { rerender } = renderHook(({ input }) => useDebouncedSearch({ input }), {
        initialProps: { input: "test query" }
      })

      // Start timeout
      vi.advanceTimersByTime(100)

      // Change the newSearch function reference by updating the mock
      // This simulates what happens when the hook dependency array changes
      vi.mocked(useActions).mockReturnValue({
        newSearch: newMockNewSearch,
        updateSearch: vi.fn(),
        toggleProductFilter: vi.fn(),
        replaceFilter: vi.fn(),
        clearFilters: vi.fn(),
        resetPagination: vi.fn(),
        setPagination: vi.fn(),
        setPageSize: vi.fn(),
        setSorting: vi.fn()
      } as any)

      // Trigger a rerender that will cause useEffect to re-run due to dependency change
      rerender({ input: "test query updated" })

      // Complete the timeout for the new call
      vi.advanceTimersByTime(300)

      // The new function should be called with the updated input
      expect(newMockNewSearch).toHaveBeenCalledTimes(1)
      expect(newMockNewSearch).toHaveBeenCalledWith({ query: "test query updated" })

      // Original function should not have been called due to cleanup
      expect(mockNewSearch).not.toHaveBeenCalled()
    })
  })

  describe("edge cases", () => {
    it("should handle minQueryLength of 0", () => {
      vi.mocked(useAutocompleteConfig).mockReturnValue({
        minQueryLength: 0,
        debounceDelay: 300,
        pageType: "search",
        memoryCache: true,
        historyEnabled: true,
        historySize: 10,
        hitDecorators: [],
        queryModifications: vi.fn()
      } as any)

      renderHook(() => useDebouncedSearch({ input: "" }))

      vi.advanceTimersByTime(300)

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "" })
    })

    it("should handle debounceDelay of 0", () => {
      vi.mocked(useAutocompleteConfig).mockReturnValue({
        minQueryLength: 3,
        debounceDelay: 0,
        pageType: "search",
        memoryCache: true,
        historyEnabled: true,
        historySize: 10,
        hitDecorators: [],
        queryModifications: vi.fn()
      } as any)

      renderHook(() => useDebouncedSearch({ input: "test query" }))

      // Should trigger immediately
      vi.advanceTimersByTime(0)

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "test query" })
    })

    it("should handle very long debounce delays", () => {
      vi.mocked(useAutocompleteConfig).mockReturnValue({
        minQueryLength: 3,
        debounceDelay: 5000,
        pageType: "search",
        memoryCache: true,
        historyEnabled: true,
        historySize: 10,
        hitDecorators: [],
        queryModifications: vi.fn()
      } as any)

      renderHook(() => useDebouncedSearch({ input: "test query" }))

      // Should not trigger at normal delays
      vi.advanceTimersByTime(1000)
      expect(mockNewSearch).not.toHaveBeenCalled()

      // Should trigger after the full delay
      vi.advanceTimersByTime(4000) // Total 5000ms
      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "test query" })
    })

    it("should handle multiple simultaneous hook instances independently", () => {
      const { rerender: rerender1 } = renderHook(({ input }) => useDebouncedSearch({ input }), {
        initialProps: { input: "first query" }
      })

      renderHook(({ input }) => useDebouncedSearch({ input }), {
        initialProps: { input: "second query" }
      })

      // Let first one complete
      vi.advanceTimersByTime(300)
      expect(mockNewSearch).toHaveBeenCalledTimes(2)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "first query" })
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "second query" })

      // Clear calls and test independence
      mockNewSearch.mockClear()

      // Update only first instance
      rerender1({ input: "updated first" })
      vi.advanceTimersByTime(300)

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "updated first" })
    })

    it("should handle whitespace-only input correctly", () => {
      renderHook(() => useDebouncedSearch({ input: "   " })) // 3 spaces, meets minQueryLength

      vi.advanceTimersByTime(300)

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: "   " })
    })

    it("should handle unicode characters correctly", () => {
      const unicodeInput = "🔍 search émoji test"

      renderHook(() => useDebouncedSearch({ input: unicodeInput }))

      vi.advanceTimersByTime(300)

      expect(mockNewSearch).toHaveBeenCalledTimes(1)
      expect(mockNewSearch).toHaveBeenCalledWith({ query: unicodeInput })
    })
  })
})
