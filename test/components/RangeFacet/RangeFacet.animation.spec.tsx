import { render } from "@testing-library/preact"
import { describe, it, expect, vi } from "vitest"
import RangeFacet from "@/components/RangeFacet/RangeFacet"
import { SearchStatsFacet } from "@nosto/nosto-js/client"

// Mock the useRange hook
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useRange: vi.fn(() => ({
    min: 10,
    max: 500,
    range: [50, 150],
    updateRange: vi.fn()
  }))
}))

// Mock the Icon component
vi.mock("@/elements/Icon/Icon", () => ({
  default: vi.fn(() => <span data-testid="icon" />)
}))

// Mock the DualRange component
vi.mock("@/elements/DualRange/DualRange", () => ({
  default: vi.fn(() => <div data-testid="dual-range" />)
}))

const mockFacet: SearchStatsFacet = {
  id: "price",
  name: "Price",
  field: "price",
  type: "stats",
  min: 10,
  max: 500
}

describe("RangeFacet Animation", () => {
  it("should render menu element with animation-ready structure", () => {
    const { container } = render(<RangeFacet facet={mockFacet} />)

    const menuElement = container.querySelector('[id$="-range-menu"]')
    expect(menuElement).toBeTruthy()
    expect(menuElement?.className).toMatch(/menu/)
  })

  it("should show correct aria attributes for accessibility", () => {
    const { getByRole } = render(<RangeFacet facet={mockFacet} />)

    const button = getByRole("button", { name: /price range filter/i })
    expect(button.getAttribute("aria-expanded")).toBe("true") // Default is selected state
    expect(button.getAttribute("aria-controls")).toBe("price-range-menu")
  })

  it("should start with selected state when range differs from default", () => {
    const { getByRole, container } = render(<RangeFacet facet={mockFacet} />)

    // Should start as active because range [50, 150] differs from min/max [10, 500]
    const button = getByRole("button", { name: /collapse price range filter/i })
    expect(button.getAttribute("aria-expanded")).toBe("true")

    // Check that active class is applied
    const listItem = container.querySelector("li")
    expect(listItem?.className).toMatch(/active/)
  })

  it("should show selected count when range is modified", () => {
    const { container } = render(<RangeFacet facet={mockFacet} />)

    // Should show count badge when selected
    const countElement = container.querySelector('[class*="count"]')
    expect(countElement?.textContent).toBe("1")
  })
})
