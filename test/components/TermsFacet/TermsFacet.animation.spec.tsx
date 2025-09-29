import { render } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import TermsFacet from "@/components/TermsFacet/TermsFacet"
import { SearchTermsFacet } from "@nosto/nosto-js/client"

// Mock the useFacet hook
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useFacet: vi.fn(() => ({
    active: false,
    selectedFiltersCount: 0,
    toggleActive: vi.fn(),
    toggleProductFilter: vi.fn()
  }))
}))

// Mock the Icon component
vi.mock("@/elements/Icon/Icon", () => ({
  default: vi.fn(() => <span data-testid="icon" />)
}))

// Mock the Pill component
vi.mock("@/elements/Pill/Pill", () => ({
  default: vi.fn(({ children, onClick }) => (
    <button onClick={onClick} data-testid="pill">
      {children}
    </button>
  ))
}))

const mockFacet: SearchTermsFacet = {
  id: "category",
  name: "Category",
  field: "categories",
  type: "terms",
  data: [
    { value: "shoes", count: 42, selected: false },
    { value: "clothing", count: 28, selected: false }
  ]
}

describe("TermsFacet Animation", () => {
  it("should render menu element with animation-ready structure", () => {
    const { container } = render(<TermsFacet facet={mockFacet} />)

    const menuElement = container.querySelector('[id$="-sub-menu"]')
    expect(menuElement).toBeTruthy()
    expect(menuElement?.className).toMatch(/menu/)
  })

  it("should show correct aria attributes for accessibility", () => {
    const { getByRole } = render(<TermsFacet facet={mockFacet} />)

    const button = getByRole("button", { name: /expand category/i })
    expect(button.getAttribute("aria-expanded")).toBe("false")
    expect(button.getAttribute("aria-controls")).toBe("category-sub-menu")
  })

  it("should render with proper DOM structure for animation", () => {
    const { container } = render(<TermsFacet facet={mockFacet} />)

    // Check that basic DOM structure is in place for animations
    const listItem = container.querySelector("li")
    const menuElement = container.querySelector('[id$="-sub-menu"]')

    expect(listItem).toBeTruthy()
    expect(menuElement).toBeTruthy()
    expect(listItem?.className).toMatch(/dropdown/)
  })
})
