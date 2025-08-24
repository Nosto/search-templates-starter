import { describe, it, expect } from "vitest"
import { renderWithSearchProvider, mockProducts } from "../../utils/test-utils"
import Product from "@/components/Product/Product"

describe("Product Component", () => {
  const mockProduct = mockProducts[0]

  it("renders product information correctly", () => {
    const { container } = renderWithSearchProvider(<Product product={mockProduct} />)

    expect(container).toBeTruthy()
    expect(container.textContent).toContain(mockProduct.name)
    expect(container.textContent).toContain(mockProduct.brand)
    expect(container.textContent).toContain(mockProduct.priceText)
  })

  it("renders product image with correct src", () => {
    const { container } = renderWithSearchProvider(<Product product={mockProduct} />)

    const img = container.querySelector("img")
    expect(img).toBeTruthy()
    expect(img?.src).toContain(mockProduct.imageUrl)
    expect(img?.alt).toBe(mockProduct.name)
  })

  it("renders as link with correct href", () => {
    const { container } = renderWithSearchProvider(<Product product={mockProduct} />)

    const link = container.querySelector("a")
    expect(link).toBeTruthy()
    expect(link?.href).toContain(mockProduct.url)
  })

  it("shows special price when listPrice is higher than price", () => {
    const productWithDiscount = {
      ...mockProduct,
      price: 20,
      priceText: "$20.00",
      listPrice: 30
    }

    const { container } = renderWithSearchProvider(<Product product={productWithDiscount} />)

    expect(container.textContent).toContain("$20.00")
    expect(container.textContent).toContain("30")
  })

  it("renders custom preview image when provided", () => {
    const customImageUrl = "https://custom.com/image.jpg"
    const { container } = renderWithSearchProvider(<Product product={mockProduct} previewImage={customImageUrl} />)

    const img = container.querySelector("img")
    expect(img?.src).toContain(customImageUrl)
  })
})
