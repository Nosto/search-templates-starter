import { render, fireEvent } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { ComponentChildren } from "preact"
import ClearFiltersButton from "@/components/ClearFiltersButton/ClearFiltersButton"
import { SidebarProvider } from "@/contexts/SidebarContext"

// Mock the @nosto/search-js/preact/hooks
const mockRemoveAll = vi.fn()
const mockUseProductFilters = vi.fn()

vi.mock("@nosto/search-js/preact/hooks", () => ({
  useProductFilters: () => mockUseProductFilters()
}))

describe("ClearFiltersButton", () => {
  const renderWithProvider = (ui: ComponentChildren) => {
    return render(<SidebarProvider>{ui}</SidebarProvider>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render when filters exist", () => {
    mockUseProductFilters.mockReturnValue({
      filters: [{ field: "category", value: "shoes" }],
      removeAll: mockRemoveAll
    })

    const { getByText } = renderWithProvider(<ClearFiltersButton />)

    expect(getByText("Clear Filters")).toBeDefined()
  })

  it("should not render when no filters exist", () => {
    mockUseProductFilters.mockReturnValue({
      filters: [],
      removeAll: mockRemoveAll
    })

    const { queryByText } = renderWithProvider(<ClearFiltersButton />)

    expect(queryByText("Clear Filters")).toBeNull()
  })

  it("should call removeAll when clicked", () => {
    mockUseProductFilters.mockReturnValue({
      filters: [{ field: "category", value: "shoes" }],
      removeAll: mockRemoveAll
    })

    const { getByText } = renderWithProvider(<ClearFiltersButton />)

    const clearButton = getByText("Clear Filters")
    fireEvent.click(clearButton)

    expect(mockRemoveAll).toHaveBeenCalled()
  })
})
