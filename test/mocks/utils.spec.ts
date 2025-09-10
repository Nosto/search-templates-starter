import { describe, it, expect } from "vitest"
import {
  createEmptyResponse,
  createTermsFacet,
  createStatsFacet,
  createKeyword,
  createKeywordsResponse,
  createProductsResponse,
  createFacetDataItem
} from "../../mocks/utils"

describe("Mock Utilities", () => {
  describe("createEmptyResponse", () => {
    it("should create an empty response with hits array and zero total", () => {
      const result = createEmptyResponse()

      expect(result).toEqual({
        hits: [],
        total: 0
      })
    })
  })

  describe("createTermsFacet", () => {
    it("should create a terms facet with provided data", () => {
      const data = [{ value: "test", count: 10, selected: false }]

      const result = createTermsFacet("test-id", "Test Name", "test-field", data)

      expect(result).toEqual({
        id: "test-id",
        name: "Test Name",
        field: "test-field",
        type: "terms",
        data
      })
    })
  })

  describe("createStatsFacet", () => {
    it("should create a stats facet with min and max values", () => {
      const result = createStatsFacet("price", "Price", "price", 10, 500)

      expect(result).toEqual({
        id: "price",
        name: "Price",
        field: "price",
        type: "stats",
        min: 10,
        max: 500
      })
    })
  })

  describe("createKeyword", () => {
    it("should create a basic keyword with defaults", () => {
      const result = createKeyword("test keyword")

      expect(result).toEqual({
        keyword: "test keyword",
        facets: [],
        priority: 1,
        total: 1
      })
    })

    it("should create a keyword with highlight", () => {
      const result = createKeyword("test keyword", { highlight: "<b>test</b> keyword" })

      expect(result).toEqual({
        keyword: "test keyword",
        _highlight: { keyword: "<b>test</b> keyword" },
        facets: [],
        priority: 1,
        total: 1
      })
    })

    it("should create a keyword with custom options", () => {
      const result = createKeyword("test keyword", {
        priority: 2,
        total: 5,
        facets: ["custom"]
      })

      expect(result).toEqual({
        keyword: "test keyword",
        facets: ["custom"],
        priority: 2,
        total: 5
      })
    })
  })

  describe("createKeywordsResponse", () => {
    it("should create a keywords response with provided keywords", () => {
      const keywords = [
        { keyword: "test1", facets: [], priority: 1, total: 1 },
        { keyword: "test2", facets: [], priority: 1, total: 1 }
      ]

      const result = createKeywordsResponse(keywords)

      expect(result).toEqual({
        hits: keywords,
        total: 2
      })
    })
  })

  describe("createProductsResponse", () => {
    it("should create a products response with provided products", () => {
      const products = [
        { id: "1", name: "Product 1" },
        { id: "2", name: "Product 2" }
      ]

      const result = createProductsResponse(products)

      expect(result).toEqual({
        hits: products,
        total: 2
      })
    })
  })

  describe("createFacetDataItem", () => {
    it("should create a facet data item with default selected false", () => {
      const result = createFacetDataItem("test-value", 42)

      expect(result).toEqual({
        value: "test-value",
        count: 42,
        selected: false
      })
    })

    it("should create a facet data item with custom selected value", () => {
      const result = createFacetDataItem("test-value", 42, true)

      expect(result).toEqual({
        value: "test-value",
        count: 42,
        selected: true
      })
    })
  })
})
