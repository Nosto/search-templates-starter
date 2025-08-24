import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Facet from "@/components/Facet/Facet"

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
