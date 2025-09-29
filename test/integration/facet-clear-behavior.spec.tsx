import { render, fireEvent } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"
import ClearFiltersButton from "@/components/ClearFiltersButton/ClearFiltersButton"

// Mock the @nosto/search-js/preact/hooks
const mockRemoveAll = vi.fn()
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useProductFilters: () => ({
    filters: [{ field: "category", value: "shoes" }],
    removeAll: mockRemoveAll
  })
}))

/**
 * Complete integration test that demonstrates the full user flow:
 * 1. User opens multiple facets
 * 2. User clicks "Clear Filters"
 * 3. All facets should be closed (active: false)
 * 4. All filters should be removed
 * 5. Sidebar should be closed
 */
describe("Complete Facet Clear Behavior", () => {
  function MockFacetComponent({ id, name }: { id: string; name: string }) {
    const { activeFacets, setFacetActive } = useSidebar()
    const isActive = activeFacets.has(id)

    return (
      <div data-testid={`facet-${id}`}>
        <button data-testid={`toggle-${id}`} onClick={() => setFacetActive(id, !isActive)} aria-expanded={isActive}>
          {isActive ? "Collapse" : "Expand"} {name}
        </button>
        <div data-testid={`status-${id}`}>{isActive ? "active" : "inactive"}</div>
        {isActive && (
          <div data-testid={`content-${id}`}>
            <div>Filter options for {name}</div>
          </div>
        )}
      </div>
    )
  }

  function TestApp() {
    const { isOpen, setOpen, activeFacets } = useSidebar()

    return (
      <div>
        <div data-testid="sidebar-status">{isOpen ? "open" : "closed"}</div>
        <div data-testid="opened-facets-count">{activeFacets.size}</div>
        <button data-testid="open-sidebar" onClick={() => setOpen(true)}>
          Open Sidebar
        </button>
        <MockFacetComponent id="category" name="Category" />
        <MockFacetComponent id="price" name="Price" />
        <MockFacetComponent id="brand" name="Brand" />
        <ClearFiltersButton />
      </div>
    )
  }

  function renderTestApp() {
    return render(
      <SidebarProvider>
        <TestApp />
      </SidebarProvider>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should demonstrate complete clear filters behavior", () => {
    const { getByTestId, getByText } = renderTestApp()

    // Step 1: Open sidebar
    fireEvent.click(getByTestId("open-sidebar"))
    expect(getByTestId("sidebar-status").textContent).toBe("open")

    // Step 2: Verify all facets start inactive
    expect(getByTestId("status-category").textContent).toBe("inactive")
    expect(getByTestId("status-price").textContent).toBe("inactive")
    expect(getByTestId("status-brand").textContent).toBe("inactive")
    expect(getByTestId("opened-facets-count").textContent).toBe("0")

    // Step 3: Expand multiple facets
    fireEvent.click(getByTestId("toggle-category"))
    fireEvent.click(getByTestId("toggle-price"))

    // Step 4: Verify facets are now active
    expect(getByTestId("status-category").textContent).toBe("active")
    expect(getByTestId("status-price").textContent).toBe("active")
    expect(getByTestId("status-brand").textContent).toBe("inactive")
    expect(getByTestId("opened-facets-count").textContent).toBe("2")

    // Step 5: Verify facet content is visible
    expect(getByTestId("content-category")).toBeDefined()
    expect(getByTestId("content-price")).toBeDefined()

    // Step 6: Clear all filters
    fireEvent.click(getByText("Clear Filters"))

    // Step 7: Verify complete state reset
    expect(getByTestId("status-category").textContent).toBe("inactive")
    expect(getByTestId("status-price").textContent).toBe("inactive")
    expect(getByTestId("status-brand").textContent).toBe("inactive")
    expect(getByTestId("opened-facets-count").textContent).toBe("0")
    expect(getByTestId("sidebar-status").textContent).toBe("closed")

    // Step 8: Verify removeAll was called
    expect(mockRemoveAll).toHaveBeenCalledTimes(1)
  })

  it("should handle edge case when no facets are expanded", () => {
    const { getByTestId, getByText } = renderTestApp()

    // Start with sidebar open but no facets expanded
    fireEvent.click(getByTestId("open-sidebar"))
    expect(getByTestId("opened-facets-count").textContent).toBe("0")

    // Clear filters
    fireEvent.click(getByText("Clear Filters"))

    // Should still work correctly
    expect(getByTestId("opened-facets-count").textContent).toBe("0")
    expect(getByTestId("sidebar-status").textContent).toBe("closed")
    expect(mockRemoveAll).toHaveBeenCalledTimes(1)
  })

  it("should maintain facet state independence", () => {
    const { getByTestId } = renderTestApp()

    // Expand one facet
    fireEvent.click(getByTestId("toggle-category"))
    expect(getByTestId("status-category").textContent).toBe("active")
    expect(getByTestId("status-price").textContent).toBe("inactive")

    // Expand another facet
    fireEvent.click(getByTestId("toggle-price"))
    expect(getByTestId("status-category").textContent).toBe("active")
    expect(getByTestId("status-price").textContent).toBe("active")

    // Collapse only one facet
    fireEvent.click(getByTestId("toggle-category"))
    expect(getByTestId("status-category").textContent).toBe("inactive")
    expect(getByTestId("status-price").textContent).toBe("active")
    expect(getByTestId("opened-facets-count").textContent).toBe("1")
  })
})
