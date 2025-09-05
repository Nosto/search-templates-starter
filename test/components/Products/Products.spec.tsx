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

// Mock the Skeleton component
vi.mock("../../../src/elements/Skeleton/Skeleton", () => ({
  default: () => (
    <div data-testid="skeleton">
      Skeleton Mock
    </div>
  )
}))

import { useNostoAppState, useDecoratedSearchResults } from "@nosto/search-js/preact/hooks"

describe("Products", () => {
  it("renders skeleton placeholders when loading and no hits available", () => {
    ;(useNostoAppState as Mock).mockReturnValue({ loading: true })
    ;(useDecoratedSearchResults as Mock).mockReturnValue({
      products: {
        hits: []
      }
    })

    const { container } = render(<Products />)
    const skeletons = container.querySelectorAll('[data-testid="skeleton"]')

    // Should render 8 skeleton placeholders when loading with skeleton enabled
    expect(skeletons).toHaveLength(8)
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
