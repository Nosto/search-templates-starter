import { render } from "@testing-library/preact"
import { describe, it, expect, beforeAll } from "vitest"
import DynamicCardProduct from "@/components/Product/DynamicCardProduct"
import { createMockProduct } from "@mocks/products"
import { MockIntersectionObserver } from "../../mocks/MockIntersectionObserver"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { createStore } from "@nosto/search-js/preact/common"
import { mockConfig, mockInitialState } from "@mocks/mocks"
import { h } from "preact"

describe("DynamicCardProduct", () => {
  beforeAll(() => {
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
  })

  const renderWithProvider = (component: preact.JSX.Element) => {
    return render(
      h(SearchPageProvider, {
        config: mockConfig,
        store: createStore(mockInitialState),
        children: component
      })
    )
  }

  it("renders skeleton structure when product has skeleton tag", () => {
    const skeletonProduct = createMockProduct({
      productId: "skeleton-1",
      tags1: ["skeleton"],
      name: "Loading Product",
      url: "#"
    })

    const { container } = renderWithProvider(<DynamicCardProduct product={skeletonProduct} />)

    // Should render an anchor (skeleton) instead of nosto-dynamic-card
    const fakeProduct = container.querySelector("a[class*='fakeProduct']")
    const dynamicCard = container.querySelector("nosto-dynamic-card")
    const imageDiv = container.querySelector("div[class*='image']")

    expect(fakeProduct).toBeTruthy()
    expect(dynamicCard).toBeNull()
    expect(imageDiv).toBeTruthy()
  })

  it("renders DynamicCard when product does not have skeleton tag", () => {
    const normalProduct = createMockProduct({
      productId: "normal-1",
      handle: "product-handle",
      name: "Normal Product",
      url: "https://example.com/product"
    })

    const { container } = renderWithProvider(<DynamicCardProduct product={normalProduct} />)

    // Should render nosto-dynamic-card
    const dynamicCard = container.querySelector("nosto-dynamic-card")

    expect(dynamicCard).toBeTruthy()
    expect(dynamicCard?.getAttribute("handle")).toBe("product-handle")
    expect(dynamicCard?.getAttribute("template")).toBe("card")
  })
})
