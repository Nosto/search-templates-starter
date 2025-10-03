import { render } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import FilterBar from "@/components/FilterBar/FilterBar"
import * as hooks from "@nosto/search-js/preact/hooks"

// Mock the hooks module
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useFacets: vi.fn(),
  useFacet: vi.fn(),
  useRange: vi.fn()
}))

describe("FilterBar", () => {
  it("renders nothing when no facets are available", () => {
    vi.mocked(hooks.useFacets).mockReturnValue({
      loading: false,
      facets: []
    })

    const { container } = render(<FilterBar />)
    expect(container.firstChild).toBeNull()
  })

  it("renders nothing when facets is null", () => {
    vi.mocked(hooks.useFacets).mockReturnValue({
      loading: false,
      facets: []
    })

    const { container } = render(<FilterBar />)
    expect(container.firstChild).toBeNull()
  })

  it("renders FilterBar with facets", () => {
    const mockTermsFacet = {
      id: "category",
      name: "Category",
      field: "categories",
      type: "terms" as const,
      data: [
        { value: "shoes", count: 42, selected: false },
        { value: "clothing", count: 28, selected: true }
      ]
    }

    const mockStatsFacet = {
      id: "price",
      name: "Price",
      field: "price",
      type: "stats" as const,
      min: 10,
      max: 500
    }

    vi.mocked(hooks.useFacets).mockReturnValue({
      loading: false,
      facets: [mockTermsFacet, mockStatsFacet]
    })

    vi.mocked(hooks.useFacet).mockReturnValue({
      active: false,
      selectedFiltersCount: 1,
      toggleActive: vi.fn(),
      toggleProductFilter: vi.fn()
    })

    vi.mocked(hooks.useRange).mockReturnValue({
      min: 10,
      max: 500,
      range: [10, 500],
      updateRange: vi.fn(),
      active: false,
      toggleActive: vi.fn()
    })

    const { getByText } = render(<FilterBar />)

    expect(getByText("Category")).toBeTruthy()
    expect(getByText("Price")).toBeTruthy()
  })
})
