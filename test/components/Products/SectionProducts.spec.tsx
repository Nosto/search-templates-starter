import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/preact"
import SectionProducts from "@/components/Products/SectionProducts"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { createStore, type State } from "@nosto/search-js/preact/common"
import { mockConfig } from "@mocks/mocks"
import { handleDecorator } from "@/decorators"

const mockFetch = vi.fn()

const testConfig = {
  ...mockConfig,
  search: {
    hitDecorators: [handleDecorator]
  }
}

// Create a simplified mock state with products that have handles
const createMockStateWithHandles = (productCount: number) =>
  ({
    loading: false,
    initialized: true,
    query: {
      query: "shoes",
      products: {}
    },
    response: {
      query: "shoes",
      products: {
        from: 0,
        size: productCount,
        total: productCount,
        hits: Array.from({ length: productCount }, (_, i) => ({
          productId: `product-${i + 1}`,
          name: `Product ${i + 1}`,
          price: 100,
          url: `https://example.com/products/product-${i + 1}`,
          handle: `product-${i + 1}`
        }))
      }
    }
  }) as Partial<State>

describe("SectionProducts", () => {
  beforeEach(() => {
    global.fetch = mockFetch
    vi.clearAllMocks()
  })

  it("renders empty when no products", () => {
    const emptyState = createMockStateWithHandles(0)

    const { container } = render(
      <SearchPageProvider config={testConfig} store={createStore(emptyState)}>
        <SectionProducts sectionId="test-section" />
      </SearchPageProvider>
    )

    expect(container.querySelector("[class*='container']")).toBeTruthy()
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it("fetches and renders section HTML", async () => {
    const mockHtml = '<div class="product-grid">Product HTML</div>'
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockHtml
    })

    const mockState = createMockStateWithHandles(3)

    const { container } = render(
      <SearchPageProvider config={testConfig} store={createStore(mockState)}>
        <SectionProducts sectionId="test-section" />
      </SearchPageProvider>
    )

    await waitFor(() => {
      expect(container.innerHTML).toContain("Product HTML")
    })

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("section_id=test-section"))
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("&q="))
  })

  it("displays error message on fetch failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"))

    const mockState = createMockStateWithHandles(3)

    render(
      <SearchPageProvider config={testConfig} store={createStore(mockState)}>
        <SectionProducts sectionId="test-section" />
      </SearchPageProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error loading products/i)).toBeTruthy()
    })
  })

  it("displays error message on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found"
    })

    const mockState = createMockStateWithHandles(3)

    render(
      <SearchPageProvider config={testConfig} store={createStore(mockState)}>
        <SectionProducts sectionId="test-section" />
      </SearchPageProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error loading products/i)).toBeTruthy()
    })
  })

  it("applies loading class during search", () => {
    const loadingState = {
      ...createMockStateWithHandles(3),
      loading: true
    }

    const { container } = render(
      <SearchPageProvider config={testConfig} store={createStore(loadingState)}>
        <SectionProducts sectionId="test-section" />
      </SearchPageProvider>
    )

    expect(container.querySelector("[class*='loading']")).toBeTruthy()
  })

  it("constructs correct URL with product handles", async () => {
    const mockHtml = "<div>Products</div>"
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockHtml
    })

    const mockState = createMockStateWithHandles(3)

    render(
      <SearchPageProvider config={testConfig} store={createStore(mockState)}>
        <SectionProducts sectionId="my-section" />
      </SearchPageProvider>
    )

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled()
    })

    const fetchCall = mockFetch.mock.calls[0][0]
    expect(fetchCall).toContain("section_id=my-section")
    expect(fetchCall).toContain("&q=product-1:product-2:product-3")
  })
})
