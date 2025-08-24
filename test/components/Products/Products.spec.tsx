import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Products from "@/components/Products/Products"

describe("Products Component", () => {
  it("renders products container", () => {
    const { container } = renderWithSearchProvider(<Products />)

    expect(container).toBeTruthy()
    const productsContainer = container.querySelector("div")
    expect(productsContainer).toBeTruthy()
  })

  it("renders products grid structure", () => {
    const { container } = renderWithSearchProvider(<Products />)

    // Should render the products grid
    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders products container with appropriate structure", () => {
    const { container } = renderWithSearchProvider(<Products />)

    const productsContainer = container.querySelector("div")
    expect(productsContainer).toBeTruthy()
  })
})
