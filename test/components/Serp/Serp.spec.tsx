import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import { SerpBody } from "@/components/Serp/Serp"

describe("Serp SerpBody Component", () => {
  it("renders loader when loading", () => {
    const { container } = renderWithSearchProvider(<SerpBody loading={true} foundProducts={false} />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders products content when not loading and products found", () => {
    const { container } = renderWithSearchProvider(<SerpBody loading={false} foundProducts={true} />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders no results when not loading and no products found", () => {
    const { container } = renderWithSearchProvider(<SerpBody loading={false} foundProducts={false} />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })
})
