import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import ProductImage from "@/components/Product/ProductImage"

describe("ProductImage", () => {
  it("renders native img element for non-Shopify/BigCommerce URLs", () => {
    const { container } = render(<ProductImage src="https://example.com/image.jpg" alt="Test image" />)
    const img = container.querySelector("img")
    const nostoImage = container.querySelector("nosto-image")

    expect(img).toBeTruthy()
    expect(nostoImage).toBeFalsy()
    expect(img?.src).toBe("https://example.com/image.jpg")
    expect(img?.alt).toBe("Test image")
  })

  it("renders Image component for Shopify CDN URLs", () => {
    const { container } = render(<ProductImage src="https://cdn.shopify.com/image.jpg" alt="Shopify image" />)
    const img = container.querySelector("img")
    const nostoImage = container.querySelector("nosto-image")

    expect(img).toBeFalsy()
    expect(nostoImage).toBeTruthy()
    expect(nostoImage?.getAttribute("src")).toBe("https://cdn.shopify.com/image.jpg")
    expect(nostoImage?.getAttribute("alt")).toBe("Shopify image")
  })

  it("renders Image component for Shopify URLs", () => {
    const { container } = render(<ProductImage src="https://mystore.shopify.com/image.jpg" alt="Shopify store image" />)
    const img = container.querySelector("img")
    const nostoImage = container.querySelector("nosto-image")

    expect(img).toBeFalsy()
    expect(nostoImage).toBeTruthy()
    expect(nostoImage?.getAttribute("src")).toBe("https://mystore.shopify.com/image.jpg")
    expect(nostoImage?.getAttribute("alt")).toBe("Shopify store image")
  })

  it("renders Image component for BigCommerce URLs", () => {
    const { container } = render(<ProductImage src="https://cdn11.bigcommerce.com/image.jpg" alt="BigCommerce image" />)
    const img = container.querySelector("img")
    const nostoImage = container.querySelector("nosto-image")

    expect(img).toBeFalsy()
    expect(nostoImage).toBeTruthy()
    expect(nostoImage?.getAttribute("src")).toBe("https://cdn11.bigcommerce.com/image.jpg")
    expect(nostoImage?.getAttribute("alt")).toBe("BigCommerce image")
  })

  it("renders Image component for BigCommerce store URLs", () => {
    const { container } = render(
      <ProductImage src="https://store.bigcommerce.com/image.jpg" alt="BigCommerce store image" />
    )
    const img = container.querySelector("img")
    const nostoImage = container.querySelector("nosto-image")

    expect(img).toBeFalsy()
    expect(nostoImage).toBeTruthy()
    expect(nostoImage?.getAttribute("src")).toBe("https://store.bigcommerce.com/image.jpg")
    expect(nostoImage?.getAttribute("alt")).toBe("BigCommerce store image")
  })

  it("renders Image component with proper image props for Shopify URLs", () => {
    const { container } = render(<ProductImage src="https://test.shopify.com/product.jpg" />)
    const nostoImage = container.querySelector("nosto-image")

    expect(nostoImage).toBeTruthy()
    expect(nostoImage?.getAttribute("width")).toBe("800")
    expect(nostoImage?.getAttribute("aspect-ratio")).toBe("0.6666666666666666")
    expect(nostoImage?.getAttribute("sizes")).toContain("(min-width: 1024px) 25vw")
  })

  it("renders Image component with proper image props for BigCommerce URLs", () => {
    const { container } = render(<ProductImage src="https://test.bigcommerce.com/product.jpg" />)
    const nostoImage = container.querySelector("nosto-image")

    expect(nostoImage).toBeTruthy()
    expect(nostoImage?.getAttribute("width")).toBe("800")
    expect(nostoImage?.getAttribute("aspect-ratio")).toBe("0.6666666666666666")
    expect(nostoImage?.getAttribute("sizes")).toContain("(min-width: 1024px) 25vw")
  })

  it("handles missing alt attribute", () => {
    const { container } = render(<ProductImage src="https://example.com/image.jpg" />)
    const img = container.querySelector("img")

    expect(img).toBeTruthy()
    expect(img?.alt).toBe("")
  })

  it("handles missing alt attribute for Shopify URLs", () => {
    const { container } = render(<ProductImage src="https://test.shopify.com/image.jpg" />)
    const nostoImage = container.querySelector("nosto-image")

    expect(nostoImage).toBeTruthy()
    expect(nostoImage?.hasAttribute("alt")).toBe(false)
  })
})
