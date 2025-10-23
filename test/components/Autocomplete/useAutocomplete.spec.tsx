import { renderHook, act } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useAutocomplete } from "@/components/Autocomplete/useAutocomplete"
import * as debouncedSearchHook from "@/hooks/useDebouncedSearch"
import * as domEventsHook from "@/hooks/useDomEvents"
import * as nostoHooks from "@nosto/search-js/preact/hooks"
import * as urlMapping from "@/mapping/url/getInitialQuery"

// Mock the dependencies
vi.mock("@/hooks/useDebouncedSearch")
vi.mock("@/hooks/useDomEvents")
vi.mock("@nosto/search-js/preact/hooks")
vi.mock("@/mapping/url/getInitialQuery")
vi.mock("@nosto/search-js/utils", () => ({
  disableNativeAutocomplete: vi.fn()
}))

describe("useAutocomplete", () => {
  const mockOnSubmit = vi.fn()
  const mockAddQuery = vi.fn()
  const mockUseDebouncedSearch = vi.fn()
  const mockUseDomEvents = vi.fn()
  const mockGetInitialQuery = vi.fn()

  beforeEach(() => {
    vi.mocked(debouncedSearchHook.useDebouncedSearch).mockImplementation(mockUseDebouncedSearch)
    vi.mocked(domEventsHook.useDomEvents).mockImplementation(mockUseDomEvents)
    vi.mocked(nostoHooks.useHistory).mockReturnValue({ addQuery: mockAddQuery })
    vi.mocked(urlMapping.getInitialQuery).mockImplementation(mockGetInitialQuery)
    
    mockGetInitialQuery.mockReturnValue("")
    mockOnSubmit.mockClear()
    mockAddQuery.mockClear()
    mockUseDebouncedSearch.mockClear()
    mockUseDomEvents.mockClear()
  })

  it("initializes with correct default values", () => {
    mockGetInitialQuery.mockReturnValue("test query")
    
    const { result } = renderHook(() =>
      useAutocomplete({
        onSubmit: mockOnSubmit
      })
    )

    expect(result.current.input).toBe("test query")
    expect(result.current.showAutocomplete).toBe(false)
    expect(typeof result.current.onSearchSubmit).toBe("function")
    expect(typeof result.current.handleInputChange).toBe("function")
    expect(typeof result.current.handleFocus).toBe("function")
  })

  it("calls useDebouncedSearch with input", () => {
    mockGetInitialQuery.mockReturnValue("search term")
    
    renderHook(() =>
      useAutocomplete({
        onSubmit: mockOnSubmit
      })
    )

    expect(mockUseDebouncedSearch).toHaveBeenCalledWith({ input: "search term" })
  })

  it("handles focus correctly", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        onSubmit: mockOnSubmit
      })
    )

    act(() => {
      result.current.handleFocus()
    })

    expect(result.current.showAutocomplete).toBe(true)
  })

  it("handles input change correctly", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        onSubmit: mockOnSubmit
      })
    )

    act(() => {
      result.current.handleInputChange("new input")
    })

    expect(result.current.input).toBe("new input")
  })

  it("handles search submit correctly for non-injected mode", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        onSubmit: mockOnSubmit,
        isInjected: false
      })
    )

    act(() => {
      result.current.onSearchSubmit("search query")
    })

    expect(mockAddQuery).toHaveBeenCalledWith("search query")
    expect(mockOnSubmit).toHaveBeenCalledWith("search query")
    expect(result.current.showAutocomplete).toBe(false)
    expect(result.current.input).toBe("search query")
  })

  it("handles search submit correctly for injected mode", () => {
    const mockSearchElement = {
      blur: vi.fn(),
      value: ""
    } as unknown as HTMLInputElement

    const { result } = renderHook(() =>
      useAutocomplete({
        onSubmit: mockOnSubmit,
        searchInputElement: mockSearchElement,
        isInjected: true
      })
    )

    act(() => {
      result.current.onSearchSubmit("search query")
    })

    expect(mockAddQuery).toHaveBeenCalledWith("search query")
    expect(mockOnSubmit).toHaveBeenCalledWith("search query")
    expect(mockSearchElement.value).toBe("search query")
    expect(mockSearchElement.blur).toHaveBeenCalled()
    expect(result.current.showAutocomplete).toBe(false)
  })

  it("trims whitespace from search query", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        onSubmit: mockOnSubmit
      })
    )

    act(() => {
      result.current.onSearchSubmit("  search query  ")
    })

    expect(mockOnSubmit).toHaveBeenCalledWith("  search query  ")
    expect(result.current.input).toBe("search query")
  })

  it("does not submit empty queries", () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        onSubmit: mockOnSubmit
      })
    )

    act(() => {
      result.current.onSearchSubmit("   ")
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
    expect(mockAddQuery).not.toHaveBeenCalled()
    expect(result.current.showAutocomplete).toBe(false)
  })
})