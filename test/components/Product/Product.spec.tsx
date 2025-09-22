import { render, fireEvent } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import { h } from "preact"
import Product from "@/components/Product/Product"
import { mockSerpProduct } from "@mocks/products"
import { mockConfig, mockInitialState } from "@mocks/mocks"
import { createStore } from "@nosto/search-js/preact/common"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import type { Product as ProductType } from "@/types"

function TestWrapper({ children }: { children: preact.ComponentChildren }) {
  return h(SearchPageProvider, {
    config: mockConfig,
    store: createStore(mockInitialState),
    children
  })
}

describe("Product", () => {
  const mockProduct: ProductType = {
    ...mockSerpProduct,
    imageUrl: "https://example.com/main-image.jpg",
    alternateImageUrls: ["https://example.com/alt-image.jpg"]
  }

  const mockProductNoAlt: ProductType = {
    ...mockSerpProduct,
    imageUrl: "https://example.com/main-image.jpg",
    alternateImageUrls: undefined
  }

  it("renders product with main image by default", () => {
    const { container } = render(
      <TestWrapper>
        <Product product={mockProduct} />
      </TestWrapper>
    )
    const img = container.querySelector("img") as HTMLImageElement
    expect(img).toBeTruthy()
    expect(img.src).toBe("https://example.com/main-image.jpg")
  })

  it("renders product information correctly", () => {
    const { container } = render(
      <TestWrapper>
        <Product product={mockProduct} />
      </TestWrapper>
    )
    expect(container.textContent).toContain(mockProduct.name)
    if (mockProduct.brand) {
      expect(container.textContent).toContain(mockProduct.brand)
    }
    if (mockProduct.priceText) {
      expect(container.textContent).toContain(mockProduct.priceText)
    }
  })

  it("does not change image on hover when showAltOnHover is false", () => {
    const { container } = render(
      <TestWrapper>
        <Product product={mockProduct} showAltOnHover={false} />
      </TestWrapper>
    )
    const img = container.querySelector("img") as HTMLImageElement
    const link = container.querySelector("a") as HTMLAnchorElement

    expect(img.src).toBe("https://example.com/main-image.jpg")

    fireEvent.mouseEnter(link)
    expect(img.src).toBe("https://example.com/main-image.jpg")

    fireEvent.mouseLeave(link)
    expect(img.src).toBe("https://example.com/main-image.jpg")
  })

  it("does not change image on hover when no alternate image is available", () => {
    const { container } = render(
      <TestWrapper>
        <Product product={mockProductNoAlt} showAltOnHover={true} />
      </TestWrapper>
    )
    const img = container.querySelector("img") as HTMLImageElement
    const link = container.querySelector("a") as HTMLAnchorElement

    expect(img.src).toBe("https://example.com/main-image.jpg")

    fireEvent.mouseEnter(link)
    expect(img.src).toBe("https://example.com/main-image.jpg")

    fireEvent.mouseLeave(link)
    expect(img.src).toBe("https://example.com/main-image.jpg")
  })

  it("changes to alternate image on hover when showAltOnHover is true and alternate image exists", () => {
    const { container } = render(
      <TestWrapper>
        <Product product={mockProduct} showAltOnHover={true} />
      </TestWrapper>
    )
    const img = container.querySelector("img") as HTMLImageElement
    const link = container.querySelector("a") as HTMLAnchorElement

    expect(img.src).toBe("https://example.com/main-image.jpg")

    fireEvent.mouseEnter(link)
    expect(img.src).toBe("https://example.com/alt-image.jpg")

    fireEvent.mouseLeave(link)
    expect(img.src).toBe("https://example.com/main-image.jpg")
  })

  it("uses first alternate image when multiple alternate images are available", () => {
    const productWithMultipleAlts: ProductType = {
      ...mockProduct,
      alternateImageUrls: ["https://example.com/alt-image-1.jpg", "https://example.com/alt-image-2.jpg"]
    }

    const { container } = render(
      <TestWrapper>
        <Product product={productWithMultipleAlts} showAltOnHover={true} />
      </TestWrapper>
    )
    const img = container.querySelector("img") as HTMLImageElement
    const link = container.querySelector("a") as HTMLAnchorElement

    expect(img.src).toBe("https://example.com/main-image.jpg")

    fireEvent.mouseEnter(link)
    expect(img.src).toBe("https://example.com/alt-image-1.jpg")
  })

  it("handles empty alternateImageUrls array gracefully", () => {
    const productWithEmptyAlts: ProductType = {
      ...mockProduct,
      alternateImageUrls: []
    }

    const { container } = render(
      <TestWrapper>
        <Product product={productWithEmptyAlts} showAltOnHover={true} />
      </TestWrapper>
    )
    const img = container.querySelector("img") as HTMLImageElement
    const link = container.querySelector("a") as HTMLAnchorElement

    expect(img.src).toBe("https://example.com/main-image.jpg")

    fireEvent.mouseEnter(link)
    expect(img.src).toBe("https://example.com/main-image.jpg")
  })

  it("renders children when provided", () => {
    const { container } = render(
      <TestWrapper>
        <Product product={mockProduct}>
          <div data-testid="child-element">Child content</div>
        </Product>
      </TestWrapper>
    )

    const childElement = container.querySelector('[data-testid="child-element"]')
    expect(childElement).toBeTruthy()
    expect(childElement?.textContent).toBe("Child content")
  })
})
