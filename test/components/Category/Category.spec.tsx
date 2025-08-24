import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import { CategoryBody } from "@/components/Category/Category"

describe("Category CategoryBody Component", () => {
  it("renders loader when loading", () => {
    const { container } = renderWithSearchProvider(<CategoryBody loading={true} foundProducts={false} />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders products content when not loading and products found", () => {
    const { container } = renderWithSearchProvider(<CategoryBody loading={false} foundProducts={true} />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders no results when not loading and no products found", () => {
    const { container } = renderWithSearchProvider(<CategoryBody loading={false} foundProducts={false} />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })
})
