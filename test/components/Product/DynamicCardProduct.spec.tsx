import { render } from "@testing-library/preact"
import { describe, it, expect, beforeAll } from "vitest"
import DynamicCardProduct from "@/components/Product/DynamicCardProduct"
import SkeletonProduct from "@/components/Product/SkeletonProduct"
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

  it("renders SkeletonProduct when product has skeleton tag", () => {
    const skeletonProduct = createMockProduct({
      productId: "skeleton-1",
      tags1: ["skeleton"],
      name: "Loading Product",
      url: "#"
    })

    const { container } = renderWithProvider(<DynamicCardProduct product={skeletonProduct} />)

    // Should render a div (skeleton) instead of nosto-dynamic-card
    const skeletonDiv = container.querySelector("div")
    const dynamicCard = container.querySelector("nosto-dynamic-card")

    expect(skeletonDiv).toBeTruthy()
    expect(dynamicCard).toBeNull()
    expect(skeletonDiv?.getAttribute("aria-label")).toBe("Loading product")
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

describe("SkeletonProduct", () => {
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

  it("renders with skeleton CSS class", () => {
    const skeletonProduct = createMockProduct({
      productId: "skeleton-1",
      tags1: ["skeleton"],
      name: "Loading Product",
      brand: "Loading Brand",
      priceText: "$0.00",
      url: "#"
    })

    const { container } = renderWithProvider(<SkeletonProduct product={skeletonProduct} />)

    const skeletonDiv = container.querySelector("div")
    expect(skeletonDiv?.className).toContain("skeleton")
  })

  it("renders product info placeholders", () => {
    const skeletonProduct = createMockProduct({
      productId: "skeleton-1",
      tags1: ["skeleton"],
      name: "Loading Product Name",
      brand: "Loading Brand",
      priceText: "$100.00",
      ratingValue: 5,
      reviewCount: 100,
      url: "#"
    })

    const { getByText } = renderWithProvider(<SkeletonProduct product={skeletonProduct} />)

    expect(getByText("Loading Product Name")).toBeTruthy()
    expect(getByText("Loading Brand")).toBeTruthy()
    expect(getByText("$100.00")).toBeTruthy()
  })

  it("renders without rating when not provided", () => {
    const skeletonProduct = createMockProduct({
      productId: "skeleton-1",
      tags1: ["skeleton"],
      name: "Loading Product",
      url: "#",
      ratingValue: undefined,
      reviewCount: undefined
    })

    const { container } = renderWithProvider(<SkeletonProduct product={skeletonProduct} />)

    // Should not contain star rating
    expect(container.textContent).not.toContain("★")
  })
})
