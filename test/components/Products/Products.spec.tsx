import { render } from "@testing-library/preact"
import { describe, it, expect, vi, Mock } from "vitest"
import Products from "../../../src/components/Products/Products"

// Mock the Nosto hooks
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useNostoAppState: vi.fn(),
  useDecoratedSearchResults: vi.fn()
}))

// Mock the config to enable skeleton loading
vi.mock("../../../src/config", () => ({
  hitDecorators: [],
  defaultConfig: {
    useSkeletonLoading: true
  }
}))

// Mock the Product component to avoid SerpElement issues
vi.mock("../../../src/components/Product/Product", () => ({
  default: ({ loading, useSkeleton }: { loading?: boolean; useSkeleton?: boolean }) => (
    <div data-testid="product" data-loading={loading} data-skeleton={useSkeleton}>
      Product Mock
    </div>
  )
}))

import { useNostoAppState, useDecoratedSearchResults } from "@nosto/search-js/preact/hooks"

describe("Products", () => {
  it("renders skeleton loaders when loading and skeleton is enabled", () => {
    ;(useNostoAppState as Mock).mockReturnValue({ loading: true })
    ;(useDecoratedSearchResults as Mock).mockReturnValue({
      products: {
        hits: []
      }
    })

    const { container } = render(<Products />)
    const products = container.querySelectorAll('[data-testid="product"]')

    // Should render 6 skeleton products
    expect(products).toHaveLength(6)

    // Each should have skeleton props
    products.forEach(product => {
      expect(product.getAttribute("data-loading")).toBe("true")
      expect(product.getAttribute("data-skeleton")).toBe("true")
    })
  })

  it("renders actual products when not loading", () => {
    ;(useNostoAppState as Mock).mockReturnValue({ loading: false })
    ;(useDecoratedSearchResults as Mock).mockReturnValue({
      products: {
        hits: [
          {
            productId: "1",
            name: "Test Product",
            url: "https://example.com/product/1",
            imageUrl: "https://example.com/image.jpg",
            priceText: "$10.00",
            handle: "test-product"
          }
        ]
      }
    })

    const { container } = render(<Products />)
    const products = container.querySelectorAll('[data-testid="product"]')

    // Should render 1 actual product
    expect(products).toHaveLength(1)

    // Should not have skeleton props
    expect(products[0].getAttribute("data-loading")).toBe("false")
    expect(products[0].getAttribute("data-skeleton")).toBe("true") // Config has skeleton enabled
  })
})
