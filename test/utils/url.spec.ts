import { describe, it, expect, beforeEach, vi } from "vitest"
import type { InputSearchSort, InputSearchTopLevelFilter } from "@nosto/nosto-js/client"
import { serializeQueryState, deserializeQueryState, updateUrl, getCurrentUrlState, UrlQueryState } from "@/url/url"
import { getPageUrl } from "@/url/page"

describe("URL utilities", () => {
  describe("serializeQueryState", () => {
    // Helper function for concise sort serialization testing
    function expectSort(sortArray: InputSearchSort[]) {
      const state = { sort: sortArray }
      const params = serializeQueryState(state, new URLSearchParams())
      return expect(params.get("sort"))
    }

    // Helper function for concise filter testing
    function expectFilters(filterArray: InputSearchTopLevelFilter[]) {
      const state = { filter: filterArray }
      const params = serializeQueryState(state, new URLSearchParams())
      return expect(params.toString())
    }

    function expectParams(state: UrlQueryState) {
      const params = serializeQueryState(state, new URLSearchParams())
      return expect(params.toString())
    }

    it("creates URLSearchParams with query parameter", () => {
      expectParams({ query: "test search" }).toBe("q=test+search")
    })

    it("creates URLSearchParams with page parameter when greater than 1", () => {
      expectParams({ query: "test", page: 2 }).toBe("q=test&p=2")
    })

    it("omits page parameter when equal to 1", () => {
      expectParams({ query: "test", page: 1 }).toBe("q=test")
    })

    it("creates URLSearchParams with size parameter when not default", () => {
      expectParams({ query: "test", size: 48 }).toBe("q=test&size=48")
    })

    it("omits size parameter when equal to default (24)", () => {
      expectParams({ query: "test", size: 24 }).toBe("q=test")
    })

    it("handles empty state", () => {
      expectParams({}).toBe("")
    })

    it("omits empty query", () => {
      expectParams({ query: "", page: 2 }).toBe("p=2")
    })

    it("creates URLSearchParams with filter parameter", () => {
      expectFilters([
        { field: "brand", value: ["Nike"] },
        { field: "color", value: ["Red"] }
      ]).toBe("filter.brand=Nike&filter.color=Red")
    })

    it("omits empty filter array", () => {
      expectParams({ query: "test", filter: [] }).toBe("q=test")
    })

    it("handles filters with query and page", () => {
      expectFilters([{ field: "category", value: ["sports"] }]).toBe("filter.category=sports")
    })

    it("spreads array filter values to multiple parameters", () => {
      expectFilters([{ field: "brand", value: ["Nike", "Adidas", "Puma"] }]).toBe(
        "filter.brand=Nike&filter.brand=Adidas&filter.brand=Puma"
      )
    })

    it("handles mixed single and array filter values", () => {
      expectFilters([
        { field: "brand", value: ["Nike", "Adidas"] },
        { field: "color", value: ["Red"] },
        { field: "size", value: ["8", "9", "10"] }
      ]).toBe("filter.brand=Nike&filter.brand=Adidas&filter.color=Red&filter.size=8&filter.size=9&filter.size=10")
    })

    it("creates URLSearchParams with sort parameter", () => {
      expectSort([{ field: "price", order: "asc" }]).toBe("price~asc")
    })

    it("creates URLSearchParams with multiple sorts", () => {
      expectSort([
        { field: "price", order: "desc" },
        { field: "_score", order: "desc" }
      ]).toBe("price~desc,_score~desc")
    })

    it("omits empty sort array", () => {
      expectSort([]).toBeNull()
    })

    it("encodes field names with tildes and commas", () => {
      expectSort([{ field: "my~field,test", order: "asc" }]).toBe("my%7Efield%2Ctest~asc")
    })
    it("handles all parameters together", () => {
      expectParams({
        query: "shoes",
        page: 2,
        size: 48,
        filter: [{ field: "brand", value: ["Nike"] }],
        sort: [{ field: "price", order: "asc" }]
      }).toBe("q=shoes&p=2&size=48&filter.brand=Nike&sort=price%7Easc")
    })

    it("creates URLSearchParams with range filter parameter", () => {
      expectFilters([{ field: "price", range: [{ gte: "10", lte: "50" }] }]).toBe(
        "filter.price.gte=10&filter.price.lte=50"
      )
    })

    it("creates URLSearchParams with partial range filters", () => {
      expectFilters([
        { field: "price", range: [{ gte: "10" }] },
        { field: "weight", range: [{ lt: "100" }] }
      ]).toBe("filter.price.gte=10&filter.weight.lt=100")
    })

    it("creates URLSearchParams with all range operators", () => {
      expectFilters([{ field: "score", range: [{ gt: "0", gte: "1", lt: "100", lte: "99" }] }]).toBe(
        "filter.score.gt=0&filter.score.gte=1&filter.score.lt=100&filter.score.lte=99"
      )
    })

    it("handles mixed value and range filters", () => {
      expectFilters([
        { field: "brand", value: ["Nike", "Adidas"] },
        { field: "price", range: [{ gte: "10", lte: "50" }] }
      ]).toBe("filter.brand=Nike&filter.brand=Adidas&filter.price.gte=10&filter.price.lte=50")
    })

    it("omits undefined range values", () => {
      expectFilters([{ field: "price", range: [{ gte: "10", lt: undefined, lte: "50" }] }]).toBe(
        "filter.price.gte=10&filter.price.lte=50"
      )
    })
  })

  describe("deserializeQueryState", () => {
    // Helper function for concise sort deserialization testing
    function expectSort(urlString: string) {
      const params = new URLSearchParams(urlString)
      const state = deserializeQueryState(params)
      return expect(state.sort)
    }

    // Helper function for concise filter deserialization testing
    function expectFilters(urlString: string) {
      const params = new URLSearchParams(urlString)
      const state = deserializeQueryState(params)
      return expect(state.filter)
    }

    function expectQueryState(urlString: string) {
      const params = new URLSearchParams(urlString)
      return expect(deserializeQueryState(params))
    }

    it("parses query parameter", () => {
      expectQueryState("q=test+search").toEqual({ query: "test search" })
    })

    it("parses page parameter when greater than 1", () => {
      expectQueryState("q=test&p=3").toEqual({ query: "test", page: 3 })
    })

    it("omits page parameter when equal to 1", () => {
      expectQueryState("q=test&p=1").toEqual({ query: "test" })
    })

    it("handles invalid page parameter", () => {
      expectQueryState("q=test&p=invalid").toEqual({ query: "test" })
    })

    it("parses size parameter", () => {
      expectQueryState("q=test&size=48").toEqual({ query: "test", size: 48 })
    })

    it("handles invalid size parameter", () => {
      expectQueryState("q=test&size=invalid").toEqual({ query: "test" })
    })

    it("handles zero or negative size parameter", () => {
      expectQueryState("q=test&size=0").toEqual({ query: "test" })
      expectQueryState("q=test&size=-5").toEqual({ query: "test" })
    })

    it("handles empty parameters", () => {
      expectQueryState("").toEqual({})
    })

    it("ignores unknown parameters", () => {
      expectQueryState("q=test&unknown=value&p=2").toEqual({
        query: "test",
        page: 2
      })
    })

    it("parses filter parameter", () => {
      expectFilters("q=test&filter.brand=Nike&filter.color=Red").toEqual([
        { field: "brand", value: ["Nike"] },
        { field: "color", value: ["Red"] }
      ])
    })

    it("parses single filter", () => {
      expectFilters("filter.category=shoes").toEqual([{ field: "category", value: ["shoes"] }])
    })

    it("handles malformed filter parameter", () => {
      expectFilters("filter.invalid=&filter.empty=").toBeUndefined()
    })

    it("filters out empty field/value pairs", () => {
      expectFilters("filter.brand=Nike&filter.empty=&filter.color=").toEqual([{ field: "brand", value: ["Nike"] }])
    })

    it("handles URL encoded filter values", () => {
      expectFilters("filter.brand=Nike+Air&filter.color=Dark+Blue").toEqual([
        { field: "brand", value: ["Nike Air"] },
        { field: "color", value: ["Dark Blue"] }
      ])
    })

    it("parses multiple filter parameters as array", () => {
      expectFilters("filter.brand=Nike&filter.brand=Adidas&filter.brand=Puma").toEqual([
        { field: "brand", value: ["Nike", "Adidas", "Puma"] }
      ])
    })

    it("handles mixed single and multiple filter parameters", () => {
      expectFilters("filter.brand=Nike&filter.brand=Adidas&filter.color=Red&filter.size=8&filter.size=9").toEqual([
        { field: "brand", value: ["Nike", "Adidas"] },
        { field: "color", value: ["Red"] },
        { field: "size", value: ["8", "9"] }
      ])
    })

    it("parses sort parameter", () => {
      expectSort("q=test&sort=price~asc").toEqual([{ field: "price", order: "asc" }])
    })

    it("parses multiple sorts parameter", () => {
      expectSort("sort=price~desc,_score~desc").toEqual([
        { field: "price", order: "desc" },
        { field: "_score", order: "desc" }
      ])
    })

    it("handles invalid sort parameter", () => {
      expectSort("q=test&sort=invalid").toBeUndefined()
    })

    it("handles empty sort parameter", () => {
      expectSort("q=test&sort=").toBeUndefined()
    })

    it("handles field names with tildes and commas", () => {
      const params = new URLSearchParams()
      params.set("sort", "my%7Efield%2Ctest~asc")
      expect(deserializeQueryState(params).sort).toEqual([{ field: "my~field,test", order: "asc" }])
    })

    it("handles field names with dashes", () => {
      expectSort("sort=my-field~asc").toEqual([{ field: "my-field", order: "asc" }])
    })

    it("handles all parameters together", () => {
      expectQueryState("q=shoes&p=2&size=48&filter.brand=Nike&sort=price~asc").toEqual({
        query: "shoes",
        page: 2,
        size: 48,
        filter: [{ field: "brand", value: ["Nike"] }],
        sort: [{ field: "price", order: "asc" }]
      })
    })

    it("parses partial range filter parameters", () => {
      expectFilters("filter.price.gte=10").toEqual([{ field: "price", range: [{ gte: "10" }] }])
      expectFilters("filter.weight.lt=100").toEqual([{ field: "weight", range: [{ lt: "100" }] }])
    })

    it("parses all range operators", () => {
      expectFilters("filter.score.gt=0&filter.score.gte=1&filter.score.lt=100&filter.score.lte=99").toEqual([
        { field: "score", range: [{ gt: "0", gte: "1", lt: "100", lte: "99" }] }
      ])
    })

    it("handles mixed value and range filter parameters", () => {
      expectFilters("filter.brand=Nike&filter.brand=Adidas&filter.price.gte=10&filter.price.lte=50").toEqual([
        { field: "brand", value: ["Nike", "Adidas"] },
        { field: "price", range: [{ gte: "10", lte: "50" }] }
      ])
    })

    it("handles multiple range filters for different fields", () => {
      expectFilters("filter.price.gte=10&filter.price.lte=50&filter.weight.gt=5&filter.rating.lte=4").toEqual([
        { field: "price", range: [{ gte: "10", lte: "50" }] },
        { field: "weight", range: [{ gt: "5" }] },
        { field: "rating", range: [{ lte: "4" }] }
      ])
    })

    it("filters out empty range filter values", () => {
      expectFilters("filter.price.gte=10&filter.price.lte=&filter.weight.gt=").toEqual([
        { field: "price", range: [{ gte: "10" }] }
      ])
    })

    it("handles URL encoded range filter values", () => {
      expectFilters("filter.price.gte=10.50&filter.discount.lte=20%25").toEqual([
        { field: "price", range: [{ gte: "10.50" }] },
        { field: "discount", range: [{ lte: "20%" }] }
      ])
    })
  })

  describe("updateUrl", () => {
    beforeEach(() => {
      // Mock window.location and window.history
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/",
          search: "",
          origin: "http://localhost:3000"
        },
        writable: true
      })

      Object.defineProperty(window, "history", {
        value: {
          replaceState: vi.fn()
        },
        writable: true
      })
    })

    it("updates URL with query parameters", () => {
      const state = { query: "test search", page: 2 }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?q=test+search&p=2")
    })

    it("updates URL without parameters when state is empty", () => {
      const state = {}
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/")
    })

    it("preserves pathname", () => {
      window.location.pathname = "/some/path"
      const state = { query: "test" }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/some/path?q=test")
    })

    it("updates URL with filter parameters", () => {
      const state = {
        query: "shoes",
        filter: [
          { field: "brand", value: ["Nike"] },
          { field: "color", value: ["Red"] }
        ]
      }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?q=shoes&filter.brand=Nike&filter.color=Red")
    })

    it("updates URL with query, page, and filter parameters", () => {
      const state = {
        query: "sneakers",
        page: 3,
        filter: [{ field: "category", value: ["sports"] }]
      }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?q=sneakers&p=3&filter.category=sports")
    })

    it("updates URL with only filter parameters", () => {
      const state = { filter: [{ field: "brand", value: ["Adidas"] }] }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?filter.brand=Adidas")
    })

    it("updates URL with array filter parameters", () => {
      const state = {
        filter: [{ field: "brand", value: ["Nike", "Adidas", "Puma"] }]
      }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(
        null,
        "",
        "/?filter.brand=Nike&filter.brand=Adidas&filter.brand=Puma"
      )
    })

    it("preserves unmapped query parameters", () => {
      window.location.search = "?q=shoes&utm_source=email&analytics=true"
      const state = { query: "sneakers", page: 2 }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(
        null,
        "",
        "/?utm_source=email&analytics=true&q=sneakers&p=2"
      )
    })

    it("preserves unmapped parameters when updating filters", () => {
      window.location.search = "?utm_campaign=summer&ref=homepage&q=shoes"
      const state = {
        query: "shoes",
        filter: [{ field: "brand", value: ["Nike"] }]
      }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(
        null,
        "",
        "/?utm_campaign=summer&ref=homepage&q=shoes&filter.brand=Nike"
      )
    })

    it("preserves unmapped parameters when state is empty", () => {
      window.location.search = "?tracking=abc123&source=direct"
      const state = {}
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?tracking=abc123&source=direct")
    })

    it("handles unmapped parameters with special characters", () => {
      window.location.search = "?custom=value%20with%20spaces&other=test%26more"
      const state = { query: "test" }
      updateUrl(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(
        null,
        "",
        "/?custom=value+with+spaces&other=test%26more&q=test"
      )
    })
  })

  describe("getCurrentUrlState", () => {
    beforeEach(() => {
      Object.defineProperty(window, "location", {
        value: {
          search: ""
        },
        writable: true
      })
    })

    it("parses current URL search parameters", () => {
      window.location.search = "?q=current+search&p=3"
      const state = getCurrentUrlState()
      expect(state).toEqual({ query: "current search", page: 3 })
    })

    it("handles empty search parameters", () => {
      window.location.search = ""
      const state = getCurrentUrlState()
      expect(state).toEqual({})
    })

    it("parses filter parameters from URL", () => {
      window.location.search = "?q=shoes&filter.brand=Nike&filter.color=Red&p=2"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        query: "shoes",
        page: 2,
        filter: [
          { field: "brand", value: ["Nike"] },
          { field: "color", value: ["Red"] }
        ]
      })
    })

    it("parses only filter parameters", () => {
      window.location.search = "?filter.category=sports"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        filter: [{ field: "category", value: ["sports"] }]
      })
    })

    it("parses size parameter from URL", () => {
      window.location.search = "?q=shoes&size=48"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        query: "shoes",
        size: 48
      })
    })

    it("parses array filter parameters from URL", () => {
      window.location.search = "?filter.brand=Nike&filter.brand=Adidas&filter.color=Red"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        filter: [
          { field: "brand", value: ["Nike", "Adidas"] },
          { field: "color", value: ["Red"] }
        ]
      })
    })

    it("parses sort parameter from URL", () => {
      window.location.search = "?q=shoes&sort=price~asc"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        query: "shoes",
        sort: [{ field: "price", order: "asc" }]
      })
    })

    it("parses all parameters including sort from URL", () => {
      window.location.search = "?q=shoes&p=2&size=48&filter.brand=Nike&sort=price~desc,_score~desc"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        query: "shoes",
        page: 2,
        size: 48,
        filter: [{ field: "brand", value: ["Nike"] }],
        sort: [
          { field: "price", order: "desc" },
          { field: "_score", order: "desc" }
        ]
      })
    })

    it("parses range filter parameters from URL", () => {
      window.location.search = "?filter.price.gte=10&filter.price.lte=50"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        filter: [{ field: "price", range: [{ gte: "10", lte: "50" }] }]
      })
    })

    it("parses mixed value and range filter parameters from URL", () => {
      window.location.search = "?q=shoes&filter.brand=Nike&filter.brand=Adidas&filter.price.gte=10&filter.price.lte=50"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        query: "shoes",
        filter: [
          { field: "brand", value: ["Nike", "Adidas"] },
          { field: "price", range: [{ gte: "10", lte: "50" }] }
        ]
      })
    })
  })

  describe("getPageUrl", () => {
    beforeEach(() => {
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/",
          search: "",
          origin: "http://localhost:3000"
        },
        writable: true
      })
    })

    it("generates URL for page 1 without page parameter", () => {
      const url = getPageUrl(1)
      expect(url).toBe("/")
    })

    it("generates URL for page 2 with page parameter", () => {
      const url = getPageUrl(2)
      expect(url).toBe("/?p=2")
    })

    it("preserves existing query parameters", () => {
      window.location.search = "?q=test+search"
      const url = getPageUrl(3)
      expect(url).toBe("/?q=test+search&p=3")
    })

    it("preserves existing query and filter parameters", () => {
      window.location.search = "?q=shoes&filter.brand=Nike&filter.color=Red"
      const url = getPageUrl(2)
      expect(url).toBe("/?q=shoes&p=2&filter.brand=Nike&filter.color=Red")
    })

    it("replaces existing page parameter", () => {
      window.location.search = "?q=test&p=5"
      const url = getPageUrl(3)
      expect(url).toBe("/?q=test&p=3")
    })

    it("removes page parameter when navigating to page 1", () => {
      window.location.search = "?q=test&p=5"
      const url = getPageUrl(1)
      expect(url).toBe("/?q=test")
    })

    it("preserves pathname", () => {
      window.location.pathname = "/search"
      const url = getPageUrl(2)
      expect(url).toBe("/search?p=2")
    })
  })
})
