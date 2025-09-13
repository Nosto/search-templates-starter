import { describe, it, expect } from "vitest"
import { createBaseProduct } from "@mocks/products"

describe("createBaseProduct", () => {
  it("should return a product with default values", () => {
    const product = createBaseProduct()

    expect(product).toMatchObject({
      productId: "default-id",
      name: "Default Product",
      price: 100.0,
      priceText: "€100.00",
      imageUrl: "https://picsum.photos/300/300",
      url: "https://example.com/product",
      handle: "default-product",
      brand: "Default Brand",
      availability: "InStock",
      currency: "EUR"
    })
  })

  it("should allow overriding default values", () => {
    const product = createBaseProduct({
      productId: "custom-id",
      name: "Custom Product",
      price: 150.0,
      brand: "Custom Brand"
    })

    expect(product.productId).toBe("custom-id")
    expect(product.name).toBe("Custom Product")
    expect(product.price).toBe(150.0)
    expect(product.brand).toBe("Custom Brand")
    // Should still have defaults for non-overridden properties
    expect(product.priceText).toBe("€100.00")
    expect(product.availability).toBe("InStock")
  })

  it("should allow partial overrides", () => {
    const product = createBaseProduct({
      name: "Partially Custom Product"
    })

    expect(product.name).toBe("Partially Custom Product")
    expect(product.productId).toBe("default-id") // Should keep default
    expect(product.price).toBe(100.0) // Should keep default
  })
})
