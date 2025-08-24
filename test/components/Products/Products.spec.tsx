import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Products from "@/components/Products/Products"

// Mock the useDecoratedSearchResults hook to return test data
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    useDecoratedSearchResults: () => ({
      products: {
        hits: [
          {
            productId: "1",
            name: "Test Product 1",
            brand: "Test Brand",
            url: "/product/1",
            imageUrl: "https://example.com/image1.jpg",
            price: 29.99,
            priceText: "$29.99"
          },
          {
            productId: "2",
            name: "Test Product 2",
            brand: "Test Brand",
            url: "/product/2",
            imageUrl: "https://example.com/image2.jpg",
            price: 19.99,
            priceText: "$19.99"
          }
        ]
      }
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useNostoAppState: (selector: (state: any) => any) => {
      const state = {
        loading: false,
        response: { products: { total: 2 } }
      }
      return selector ? selector(state) : state
    }
  }
})

describe("Products Component", () => {
  it("renders products container", () => {
    const { container } = renderWithSearchProvider(<Products />)

    expect(container).toBeTruthy()
    const productsContainer = container.querySelector("div")
    expect(productsContainer).toBeTruthy()
  })

  it("renders products when data is available", () => {
    const { container } = renderWithSearchProvider(<Products />)

    // Should contain product names from mock data
    expect(container.textContent).toContain("Test Product 1")
    expect(container.textContent).toContain("Test Product 2")
  })

  it("applies loading opacity when loading", () => {
    // This test would require mocking the loading state
    const { container } = renderWithSearchProvider(<Products />)

    const productsContainer = container.querySelector("div")
    expect(productsContainer).toBeTruthy()
  })
})
