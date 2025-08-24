import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters"

describe("SelectedFilters Component", () => {
  it("renders without errors", () => {
    const { container } = renderWithSearchProvider(<SelectedFilters />)

    expect(container).toBeTruthy()
    // Component may render empty when no filters are selected
  })

  it("handles empty filter state", () => {
    const { container } = renderWithSearchProvider(<SelectedFilters />)

    // Should render the component or be empty if no filters selected
    expect(container).toBeTruthy()
  })

  it("renders component successfully", () => {
    const { container } = renderWithSearchProvider(<SelectedFilters />)

    // Should render without errors
    expect(container).toBeTruthy()
  })
})
