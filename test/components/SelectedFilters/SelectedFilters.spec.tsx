import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"

// Mock the useProductFilters hook
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    useProductFilters: () => ({
      filters: [
        {
          name: "Brand",
          value: "Test Brand",
          remove: vi.fn()
        },
        {
          name: "Price",
          value: "$20-$50",
          remove: vi.fn()
        }
      ],
      removeAll: vi.fn()
    })
  }
})

describe("SelectedFilters Component", () => {
  it("renders selected filters when filters exist", () => {
    const { container } = renderWithSearchProvider(<SelectedFilters />)

    expect(container).toBeTruthy()
    expect(container.textContent).toContain("Brand: Test Brand")
    expect(container.textContent).toContain("Price: $20-$50")
  })

  it("renders clear filters button", () => {
    const { container } = renderWithSearchProvider(<SelectedFilters />)

    expect(container.textContent).toContain("Clear Filters")
  })

  it("renders remove buttons for each filter", () => {
    const { container } = renderWithSearchProvider(<SelectedFilters />)

    const removeButtons = container.querySelectorAll("button")
    // Should have remove buttons for each filter
    expect(removeButtons.length).toBeGreaterThan(0)
  })
})
