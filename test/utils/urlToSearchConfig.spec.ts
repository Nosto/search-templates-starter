import { describe, it, expect } from "vitest"
import { convertUrlStateToSearchConfig, getSearchConfigFromCurrentUrl } from "@/mapping/url/urlToSearchConfig"
import type { UrlQueryState } from "@/mapping/url/types"

describe("urlToSearchConfig", () => {
  describe("convertUrlStateToSearchConfig", () => {
    it("returns null when no query is provided", () => {
      const urlState: UrlQueryState = {}
      const result = convertUrlStateToSearchConfig(urlState)
      expect(result).toBeNull()
    })

    it("returns null when query is empty", () => {
      const urlState: UrlQueryState = { query: "" }
      const result = convertUrlStateToSearchConfig(urlState)
      expect(result).toBeNull()
    })

    it("converts basic query to search config", () => {
      const urlState: UrlQueryState = { query: "test" }
      const result = convertUrlStateToSearchConfig(urlState)

      expect(result).toEqual({
        query: "test",
        products: {
          size: 24, // default size
          from: 0,
          filter: undefined,
          sort: undefined
        }
      })
    })

    it("converts full URL state to search config", () => {
      const urlState: UrlQueryState = {
        query: "shoes",
        page: 2,
        size: 48,
        filter: [{ field: "brand", value: ["Nike"] }],
        sort: [{ field: "price", order: "desc" }]
      }

      const result = convertUrlStateToSearchConfig(urlState)

      expect(result).toEqual({
        query: "shoes",
        products: {
          size: 48,
          from: 48, // page 2 with size 48
          filter: [{ field: "brand", value: ["Nike"] }],
          sort: [{ field: "price", order: "desc" }]
        }
      })
    })

    it("uses default size when not provided", () => {
      const urlState: UrlQueryState = {
        query: "test",
        page: 3
      }

      const result = convertUrlStateToSearchConfig(urlState)

      expect(result).toEqual({
        query: "test",
        products: {
          size: 24, // default size
          from: 48, // page 3 with default size 24
          filter: undefined,
          sort: undefined
        }
      })
    })

    it("calculates correct 'from' value for pagination", () => {
      const urlState: UrlQueryState = {
        query: "test",
        page: 1,
        size: 12
      }

      const result = convertUrlStateToSearchConfig(urlState)
      expect(result).toEqual({
        query: "test",
        products: {
          size: 12,
          from: 0, // page 1 should have from = 0
          filter: undefined,
          sort: undefined
        }
      })

      const urlState2: UrlQueryState = {
        query: "test",
        page: 3,
        size: 12
      }

      const result2 = convertUrlStateToSearchConfig(urlState2)
      expect(result2).toEqual({
        query: "test",
        products: {
          size: 12,
          from: 24, // page 3 with size 12: (3-1) * 12 = 24
          filter: undefined,
          sort: undefined
        }
      })
    })
  })

  describe("getSearchConfigFromCurrentUrl", () => {
    it("gets search config from current URL", () => {
      // Mock window.location
      Object.defineProperty(window, "location", {
        value: {
          search: "?q=test&p=2&size=48"
        },
        writable: true
      })

      const result = getSearchConfigFromCurrentUrl()

      expect(result).toEqual({
        query: "test",
        products: {
          size: 48,
          from: 48,
          filter: undefined,
          sort: undefined
        }
      })
    })

    it("returns null when no query in URL", () => {
      Object.defineProperty(window, "location", {
        value: {
          search: "?p=2&size=48"
        },
        writable: true
      })

      const result = getSearchConfigFromCurrentUrl()
      expect(result).toBeNull()
    })
  })
})
