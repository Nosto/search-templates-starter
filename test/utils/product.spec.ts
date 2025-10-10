import { describe, it, expect } from "vitest"
import { isProductNew } from "@/utils/product"
import { createMockProduct } from "@mocks/products"

describe("isProductNew", () => {
  it("should return true for products published within 14 days", () => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const product = createMockProduct({ datePublished: sevenDaysAgo })

    expect(isProductNew(product)).toBe(true)
  })

  it("should return true for products published exactly 14 days ago", () => {
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000
    const product = createMockProduct({ datePublished: fourteenDaysAgo })

    expect(isProductNew(product)).toBe(true)
  })

  it("should return false for products published more than 14 days ago", () => {
    const fifteenDaysAgo = Date.now() - 15 * 24 * 60 * 60 * 1000
    const product = createMockProduct({ datePublished: fifteenDaysAgo })

    expect(isProductNew(product)).toBe(false)
  })

  it("should return false when datePublished is undefined", () => {
    const product = createMockProduct({ datePublished: undefined })

    expect(isProductNew(product)).toBe(false)
  })

  it("should return false when datePublished is null", () => {
    const product = createMockProduct({ datePublished: null as unknown as number })

    expect(isProductNew(product)).toBe(false)
  })

  it("should return true for products published today", () => {
    const today = Date.now()
    const product = createMockProduct({ datePublished: today })

    expect(isProductNew(product)).toBe(true)
  })
})
