import { describe, it, expect } from "vitest"
import { handleDecorator } from "@/decorators"

describe("handleDecorator", () => {
  it("should add handle from the last segment of the url", () => {
    const product = { url: "https://example.com/products/abc-123" }
    expect(handleDecorator(product)).toEqual({ url: "https://example.com/products/abc-123", handle: "abc-123" })
  })

  it("should return null handle if url is undefined", () => {
    const product = {}
    expect(handleDecorator(product)).toEqual({ handle: undefined })
  })

  it("should return null handle if url is empty string", () => {
    const product = { url: "" }
    expect(handleDecorator(product)).toEqual({ url: "", handle: undefined })
  })

  it("should handle url with trailing slash", () => {
    const product = { url: "https://example.com/products/abc-123/" }
    expect(handleDecorator(product)).toEqual({ url: "https://example.com/products/abc-123/", handle: undefined })
  })

  it("should handle url with parameters", () => {
    const product = { url: "https://example.com/products/abc-123?ref=homepage" }
    expect(handleDecorator(product)).toEqual({
      url: "https://example.com/products/abc-123?ref=homepage",
      handle: "abc-123"
    })
  })

  it("should preserve other product properties", () => {
    const product = { url: "https://example.com/products/xyz", name: "Test Product", price: 10 }
    expect(handleDecorator(product)).toEqual({
      url: "https://example.com/products/xyz",
      name: "Test Product",
      price: 10,
      handle: "xyz"
    })
  })
})
