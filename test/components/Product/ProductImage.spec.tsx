import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import ProductImage from "@/components/Product/ProductImage"
import { responsiveImageSizes } from "@/constants/imageSizing"

describe("ProductImage", () => {
  it("renders nosto-image for Shopify URLs with responsive sizing", () => {
    const { container } = render(
      <ProductImage src="https://cdn.shopify.com/s-files/1/0123/4567/products/test.jpg" alt="Test Product" />
    )
    const nostoImage = container.querySelector("nosto-image") as HTMLElement
    expect(nostoImage).toBeTruthy()
    expect(nostoImage.getAttribute("src")).toBe("https://cdn.shopify.com/s-files/1/0123/4567/products/test.jpg")
    expect(nostoImage.getAttribute("alt")).toBe("Test Product")
    expect(nostoImage.getAttribute("width")).toBe("750")
    expect(nostoImage.getAttribute("sizes")).toBe(responsiveImageSizes)
  })

  it("renders regular img for picsum URLs (non-Shopify)", () => {
    const { container } = render(<ProductImage src="https://picsum.photos/id/123/500/750" alt="Test Image" />)
    const img = container.querySelector("img") as HTMLImageElement
    const nostoImage = container.querySelector("nosto-image")

    expect(img).toBeTruthy()
    expect(nostoImage).toBeFalsy()
    expect(img.src).toBe("https://picsum.photos/id/123/500/750")
    expect(img.alt).toBe("Test Image")
  })

  it("renders regular img for other URLs", () => {
    const { container } = render(<ProductImage src="https://example.com/image.jpg" alt="Example Image" />)
    const img = container.querySelector("img") as HTMLImageElement
    const nostoImage = container.querySelector("nosto-image")

    expect(img).toBeTruthy()
    expect(nostoImage).toBeFalsy()
    expect(img.src).toBe("https://example.com/image.jpg")
    expect(img.alt).toBe("Example Image")
  })

  it("renders with default alt when not provided", () => {
    const { container } = render(<ProductImage src="https://cdn.shopify.com/s-files/1/0123/4567/products/test.jpg" />)
    const nostoImage = container.querySelector("nosto-image") as HTMLElement
    expect(nostoImage).toBeTruthy()
    expect(nostoImage.getAttribute("alt")).toBe(null)
  })
})
