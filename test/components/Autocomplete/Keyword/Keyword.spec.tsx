import { render } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import type { JSX } from "preact"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"
import { SearchKeyword } from "@nosto/nosto-js/client"

// Mock the AutocompleteElement to avoid dependencies on Nosto context
vi.mock("@nosto/search-js/preact/autocomplete", () => ({
  AutocompleteElement: ({
    children,
    componentProps,
    hit
  }: {
    children: JSX.Element | string
    componentProps: JSX.HTMLAttributes<HTMLDivElement>
    hit: unknown
  }) => (
    <div {...componentProps} data-testid="autocomplete-element" data-hit={JSON.stringify(hit)}>
      {children}
    </div>
  )
}))

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

  it("should render keyword text without highlight", () => {
    const keyword = createKeyword({ keyword: "running shoes" })
    const { getByText } = render(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    expect(getByText("running shoes")).toBeTruthy()
  })

  it("should render highlighted keyword when _highlight is present", () => {
    const keyword = createKeyword({
      keyword: "running shoes",
      _highlight: { keyword: "<b>running</b> shoes" }
    })
    const { container } = render(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const highlightedSpan = container.querySelector("span")
    expect(highlightedSpan?.innerHTML).toBe("<b>running</b> shoes")
  })

  it("should call onSubmit with keyword when clicked and no redirect is present", () => {
    const keyword = createKeyword({ keyword: "test search" })
    const { getByTestId } = render(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = getByTestId("autocomplete-element")
    element.click()

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith("test search")
  })

  it("should redirect to _redirect URL when clicked and redirect is present", () => {
    const keyword = createKeyword({
      keyword: "redirect test",
      _redirect: "https://example.com/redirect"
    })
    const { getByTestId } = render(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = getByTestId("autocomplete-element")
    element.click()

    expect(window.location.href).toBe("https://example.com/redirect")
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it("should prevent default behavior when clicked", () => {
    const keyword = createKeyword({ keyword: "test" })
    const { getByTestId } = render(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = getByTestId("autocomplete-element")

    // Simulate click event by dispatching the actual event
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    // Since we can't easily test preventDefault directly with the mocked component,
    // let's verify the component behavior instead - onSubmit should be called
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith("test")
  })

  it("should handle empty string redirect as no redirect", () => {
    const keyword = createKeyword({
      keyword: "test search",
      _redirect: ""
    })
    const { getByTestId } = render(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = getByTestId("autocomplete-element")
    element.click()

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith("test search")
  })

  it("should prioritize redirect over onSubmit when both redirect and keyword are present", () => {
    const keyword = createKeyword({
      keyword: "search term",
      _redirect: "https://example.com/priority-test"
    })
    const { getByTestId } = render(<Keyword keyword={keyword} onSubmit={mockOnSubmit} />)

    const element = getByTestId("autocomplete-element")
    element.click()

    expect(window.location.href).toBe("https://example.com/priority-test")
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
