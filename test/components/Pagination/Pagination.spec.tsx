import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Pagination from "@/components/Pagination/Pagination"

describe("Pagination Component", () => {
  it("renders pagination container", () => {
    const { container } = renderWithSearchProvider(<Pagination />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders pagination content", () => {
    const { container } = renderWithSearchProvider(<Pagination />)

    // Should render pagination structure
    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })
})
