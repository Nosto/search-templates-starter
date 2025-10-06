import { render } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import type { JSX } from "preact"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"
import { SearchKeyword } from "@nosto/nosto-js/client"
import { withAutocompleteContext } from ".storybook/decorators"

describe("Keyword", () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockReset()
    // Reset window.location mock
    // Mock window.location
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true
    })
  })

  const createKeyword = (overrides: Partial<SearchKeyword> = {}): SearchKeyword => ({
    keyword: "test keyword",
    facets: [],
    priority: 1,
    total: 1,
    ...overrides
  })

  const renderWithContext = (component: JSX.Element) => {
    return render(withAutocompleteContext(() => component))
  }

  it("should render keyword text without highlight", () => {
    const keyword = createKeyword({ keyword: "running shoes" })
    const { getByText } = renderWithContext(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    expect(getByText("running shoes")).toBeTruthy()
  })

  it("should render highlighted keyword when _highlight is present", () => {
    const keyword = createKeyword({
      keyword: "running shoes",
      _highlight: { keyword: "<b>running</b> shoes" }
    })
    const { container } = renderWithContext(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    // Check that the highlight content is present in the rendered output
    expect(container.innerHTML).toContain("<b>running</b> shoes")
  })

  it("should call onSubmit with keyword when clicked and no redirect is present", () => {
    const keyword = createKeyword({ keyword: "test search" })
    const { container } = renderWithContext(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = container.querySelector("[role='button']") || container.firstChild
    element?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith("test search")
  })

  it("should redirect to _redirect URL when clicked and redirect is present", () => {
    const keyword = createKeyword({
      keyword: "redirect test",
      _redirect: "https://example.com/redirect"
    })
    const { container } = renderWithContext(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = container.querySelector("[role='button']") || container.firstChild
    element?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(window.location.href).toBe("https://example.com/redirect")
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it("should handle empty string redirect as no redirect", () => {
    const keyword = createKeyword({
      keyword: "test search",
      _redirect: ""
    })
    const { container } = renderWithContext(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = container.querySelector("[role='button']") || container.firstChild
    element?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith("test search")
  })

  it("should prioritize redirect over onSubmit when both redirect and keyword are present", () => {
    const keyword = createKeyword({
      keyword: "search term",
      _redirect: "https://example.com/priority-test"
    })
    const { container } = renderWithContext(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = container.querySelector("[role='button']") || container.firstChild
    element?.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(window.location.href).toBe("https://example.com/priority-test")
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
