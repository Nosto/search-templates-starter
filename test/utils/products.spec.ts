import { describe, it, expect } from "vitest"
import { isContentProduct, splitProductsByType } from "@/utils/products"
import type { Product } from "@/types"

describe("products utils", () => {
  describe("isContentProduct", () => {
    it("should return true for products with type=content custom field", () => {
      const product = {
        productId: "1",
        customFields: [{ key: "type", value: "content" }]
      } as Product

      expect(isContentProduct(product)).toBe(true)
    })

    it("should return false for products without type=content custom field", () => {
      const product = {
        productId: "2",
        customFields: [{ key: "type", value: "normal" }]
      } as Product

      expect(isContentProduct(product)).toBe(false)
    })

    it("should return false for products without customFields", () => {
      const product = {
        productId: "3"
      } as Product

      expect(isContentProduct(product)).toBe(false)
    })

    it("should return false for products with empty customFields", () => {
      const product = {
        productId: "4",
        customFields: []
      } as Product

      expect(isContentProduct(product)).toBe(false)
    })
  })

  describe("splitProductsByType", () => {
    it("should split products into normal and content products", () => {
      const products = [
        {
          productId: "1",
          customFields: [{ key: "type", value: "content" }]
        },
        {
          productId: "2",
          customFields: [{ key: "type", value: "normal" }]
        },
        {
          productId: "3"
        },
        {
          productId: "4",
          customFields: [{ key: "type", value: "content" }]
        }
      ] as Product[]

      const result = splitProductsByType(products)

      expect(result.contentProducts).toHaveLength(2)
      expect(result.normalProducts).toHaveLength(2)
      expect(result.contentProducts[0].productId).toBe("1")
      expect(result.contentProducts[1].productId).toBe("4")
      expect(result.normalProducts[0].productId).toBe("2")
      expect(result.normalProducts[1].productId).toBe("3")
    })

    it("should handle all normal products", () => {
      const products = [{ productId: "1" }, { productId: "2" }] as Product[]

      const result = splitProductsByType(products)

      expect(result.contentProducts).toHaveLength(0)
      expect(result.normalProducts).toHaveLength(2)
    })

    it("should handle all content products", () => {
      const products = [
        {
          productId: "1",
          customFields: [{ key: "type", value: "content" }]
        },
        {
          productId: "2",
          customFields: [{ key: "type", value: "content" }]
        }
      ] as Product[]

      const result = splitProductsByType(products)

      expect(result.contentProducts).toHaveLength(2)
      expect(result.normalProducts).toHaveLength(0)
    })

    it("should handle empty array", () => {
      const result = splitProductsByType([])

      expect(result.contentProducts).toHaveLength(0)
      expect(result.normalProducts).toHaveLength(0)
    })
  })
})
