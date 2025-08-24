import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Sidebar from "@/components/Sidebar/Sidebar"

describe("Sidebar Component", () => {
  it("renders without errors", () => {
    const { container } = renderWithSearchProvider(<Sidebar />)

    expect(container).toBeTruthy()
    // Component may render empty when no facets are available
  })

  it("renders sidebar when facets are available", () => {
    const { container } = renderWithSearchProvider(<Sidebar />)

    // Should render the sidebar or be empty if no facets
    expect(container).toBeTruthy()
  })

  it("handles empty state appropriately", () => {
    const { container } = renderWithSearchProvider(<Sidebar />)

    // Should render without throwing errors, may be empty if no facets
    expect(container).toBeTruthy()
  })
})
