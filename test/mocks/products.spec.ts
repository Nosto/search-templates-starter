import { describe, it, expect } from "vitest"
import { createBaseProduct } from "@mocks/products"

describe("createBaseProduct", () => {
  it("should return a product with required properties", () => {
    const product = createBaseProduct()

    expect(product).toHaveProperty("productId")
    expect(product).toHaveProperty("name")
    expect(product).toHaveProperty("price")
    expect(product).toHaveProperty("priceText")
    expect(product).toHaveProperty("imageUrl")
    expect(product).toHaveProperty("url")
    expect(product).toHaveProperty("brand")
    expect(product).toHaveProperty("availability")
    expect(product).toHaveProperty("priceCurrencyCode")
    expect(product.availability).toBe("InStock")
    expect(product.priceCurrencyCode).toBe("EUR")
    expect(typeof product.price).toBe("number")
    expect(product.price).toBeGreaterThan(0)
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
    expect(product.availability).toBe("InStock")
    expect(product.priceCurrencyCode).toBe("EUR")
  })

  it("should allow partial overrides", () => {
    const product = createBaseProduct({
      name: "Partially Custom Product"
    })

    expect(product.name).toBe("Partially Custom Product")
    expect(product).toHaveProperty("productId")
    expect(typeof product.price).toBe("number")
    expect(product.price).toBeGreaterThan(0)
  })
})
