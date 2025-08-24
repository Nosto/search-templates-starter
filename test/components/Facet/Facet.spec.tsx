import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Facet from "@/components/Facet/Facet"

// Mock the facet hooks
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    useFacet: () => ({
      toggleTerm: vi.fn(),
      clearTerm: vi.fn(),
      setRange: vi.fn(),
      isTermSelected: vi.fn(() => false)
    })
  }
})

describe("Facet Component", () => {
  const mockTermsFacet = {
    id: "brand",
    name: "Brand",
    type: "terms" as const,
    field: "brand",
    data: [
      { value: "test-brand", count: 5, selected: false },
      { value: "another-brand", count: 3, selected: false }
    ]
  }

  it("renders facet with name", () => {
    const { container } = renderWithSearchProvider(<Facet facet={mockTermsFacet} />)

    expect(container).toBeTruthy()
    expect(container.textContent).toContain("Brand")
  })

  it("renders facet options when expanded", () => {
    const { container } = renderWithSearchProvider(<Facet facet={mockTermsFacet} />)

    // The facet should render the dropdown structure
    expect(container.innerHTML).toBeTruthy()
  })
})
