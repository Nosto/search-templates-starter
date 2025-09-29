import { render, fireEvent } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"
import ClearFiltersButton from "@/components/ClearFiltersButton/ClearFiltersButton"

// Mock the @nosto/search-js/preact/hooks
const mockRemoveAll = vi.fn()
const mockUseProductFilters = vi.fn()

vi.mock("@nosto/search-js/preact/hooks", () => ({
  useProductFilters: () => mockUseProductFilters()
}))

// Test component to demonstrate integration
function TestFacetComponent({ facetId }: { facetId: string }) {
  const { openedFacets, setFacetOpen } = useSidebar()
  const isOpen = openedFacets.has(facetId)

  return (
    <div>
      <div data-testid={`facet-${facetId}-status`}>{isOpen ? "expanded" : "collapsed"}</div>
      <button data-testid={`expand-${facetId}`} onClick={() => setFacetOpen(facetId, true)}>
        Expand {facetId}
      </button>
    </div>
  )
}

function IntegrationTestApp() {
  return (
    <SidebarProvider>
      <TestFacetComponent facetId="category" />
      <TestFacetComponent facetId="price" />
      <TestFacetComponent facetId="brand" />
      <ClearFiltersButton />
    </SidebarProvider>
  )
}

describe("ClearFiltersButton Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseProductFilters.mockReturnValue({
      filters: [{ field: "category", value: "shoes" }],
      removeAll: mockRemoveAll
    })
  })

  it("should close all expanded facets when clearing filters", () => {
    const { getByTestId, getByText } = render(<IntegrationTestApp />)

    // Initially all facets should be collapsed
    expect(getByTestId("facet-category-status").textContent).toBe("collapsed")
    expect(getByTestId("facet-price-status").textContent).toBe("collapsed")
    expect(getByTestId("facet-brand-status").textContent).toBe("collapsed")

    // Expand some facets
    fireEvent.click(getByTestId("expand-category"))
    fireEvent.click(getByTestId("expand-price"))

    // Verify facets are expanded
    expect(getByTestId("facet-category-status").textContent).toBe("expanded")
    expect(getByTestId("facet-price-status").textContent).toBe("expanded")
    expect(getByTestId("facet-brand-status").textContent).toBe("collapsed")

    // Clear all filters
    fireEvent.click(getByText("Clear Filters"))

    // Verify all facets are now collapsed
    expect(getByTestId("facet-category-status").textContent).toBe("collapsed")
    expect(getByTestId("facet-price-status").textContent).toBe("collapsed")
    expect(getByTestId("facet-brand-status").textContent).toBe("collapsed")

    // Verify removeAll was called
    expect(mockRemoveAll).toHaveBeenCalled()
  })

  it("should handle the case when no facets are expanded", () => {
    const { getByText, getByTestId } = render(<IntegrationTestApp />)

    // All facets start collapsed
    expect(getByTestId("facet-category-status").textContent).toBe("collapsed")
    expect(getByTestId("facet-price-status").textContent).toBe("collapsed")
    expect(getByTestId("facet-brand-status").textContent).toBe("collapsed")

    // Clear filters when no facets are expanded
    fireEvent.click(getByText("Clear Filters"))

    // All facets should still be collapsed
    expect(getByTestId("facet-category-status").textContent).toBe("collapsed")
    expect(getByTestId("facet-price-status").textContent).toBe("collapsed")
    expect(getByTestId("facet-brand-status").textContent).toBe("collapsed")

    // Verify removeAll was still called
    expect(mockRemoveAll).toHaveBeenCalled()
  })
})
