import { render } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"
import { useProductFilters } from "@nosto/search-js/preact/hooks"

// Mock the useProductFilters hook
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useProductFilters: vi.fn()
}))

const mockUseProductFilters = vi.mocked(useProductFilters)

describe("SelectedFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("displays filter name and value in format 'name: value'", () => {
    mockUseProductFilters.mockReturnValue({
      filters: [
        {
          name: "color",
          value: "red",
          field: "color",
          filter: {},
          remove: vi.fn()
        },
        {
          name: "Price",
          value: "50 - 150",
          field: "price",
          filter: {},
          remove: vi.fn()
        }
      ],
      removeAll: vi.fn()
    })

    const { getByText } = render(<SelectedFilters />)

    const colorPill = getByText("color: red")
    const pricePill = getByText("Price: 50 - 150")
    
    expect(colorPill).toBeTruthy()
    expect(pricePill).toBeTruthy()
  })

  it("renders nothing when no filters are selected", () => {
    mockUseProductFilters.mockReturnValue({
      filters: [],
      removeAll: vi.fn()
    })

    const { container } = render(<SelectedFilters />)

    expect(container.firstChild).toBeNull()
  })

  it("handles undefined filter values gracefully", () => {
    mockUseProductFilters.mockReturnValue({
      filters: [undefined, null],
      removeAll: vi.fn()
    })

    const { container } = render(<SelectedFilters />)

    // Should render the wrapper since filters.length > 0
    const wrapper = container.querySelector("div") // Use generic div selector
    expect(wrapper).toBeTruthy()
    
    // Should have pills with ": " content (empty name and value)
    const pills = container.querySelectorAll("button")
    expect(pills.length).toBe(2)
    expect(pills[0].textContent).toBe(": ")
    expect(pills[1].textContent).toBe(": ")
  })
})