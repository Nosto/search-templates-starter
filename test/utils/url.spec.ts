import { describe, it, expect, beforeEach, vi } from "vitest"
import type { InputSearchSort, InputSearchTopLevelFilter } from "@nosto/nosto-js/client"
import { serializeQueryState, deserializeQueryState, updateUrl, getCurrentUrlState, getPageUrl } from "@/utils/url"

describe("URL utilities", () => {
  describe("serializeQueryState", () => {
    // Helper function for concise sort serialization testing
    function expectSort(sortArray: InputSearchSort[]) {
      const state = { sort: sortArray }
      const params = serializeQueryState(state)
      return expect(params.get("sort"))
    }

    // Helper function for concise filter testing
    function expectFilters(filterArray: InputSearchTopLevelFilter[]) {
      const state = { filter: filterArray }
      return serializeQueryState(state)
    }
    it("creates URLSearchParams with query parameter", () => {
      const state = { query: "test search" }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("test search")
      expect(params.get("p")).toBeNull()
    })

    it("creates URLSearchParams with page parameter when greater than 1", () => {
      const state = { query: "test", page: 2 }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("test")
      expect(params.get("p")).toBe("2")
    })

    it("omits page parameter when equal to 1", () => {
      const state = { query: "test", page: 1 }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("test")
      expect(params.get("p")).toBeNull()
    })

    it("handles empty state", () => {
      const state = {}
      const params = serializeQueryState(state)
      expect(params.toString()).toBe("")
    })

    it("omits empty query", () => {
      const state = { query: "", page: 2 }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBeNull()
      expect(params.get("p")).toBe("2")
    })

    it("creates URLSearchParams with filter parameter", () => {
      const filters = [
        { field: "brand", value: ["Nike"] },
        { field: "color", value: ["Red"] }
      ]
      const state = { filter: filters }
      const params = serializeQueryState(state)
      expect(params.toString()).toBe("filter.brand=Nike&filter.color=Red")
    })

    it("omits empty filter array", () => {
      const state = { query: "test", filter: [] }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("test")
      expect(params.has("filter.brand")).toBe(false)
      expect(params.has("filter.color")).toBe(false)
    })

    it("handles filters with query and page", () => {
      const filters = [{ field: "category", value: ["sports"] }]
      const state = { filter: filters }
      const params = serializeQueryState(state)
      expect(params.toString()).toBe("filter.category=sports")
    })

    it("spreads array filter values to multiple parameters", () => {
      const filters = [{ field: "brand", value: ["Nike", "Adidas", "Puma"] }]
      const state = { filter: filters }
      const params = serializeQueryState(state)
      expect(params.toString()).toBe("filter.brand=Nike&filter.brand=Adidas&filter.brand=Puma")
    })

    it("handles mixed single and array filter values", () => {
      const filters = [
        { field: "brand", value: ["Nike", "Adidas"] },
        { field: "color", value: ["Red"] },
        { field: "size", value: ["8", "9", "10"] }
      ]
      const state = { filter: filters }
      const params = serializeQueryState(state)
      expect(params.toString()).toBe(
        "filter.brand=Nike&filter.brand=Adidas&filter.color=Red&filter.size=8&filter.size=9&filter.size=10"
      )
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
      const state = {
        query: "shoes",
        page: 2,
        filter: [{ field: "brand", value: ["Nike"] }],
        sort: [{ field: "price", order: "asc" }] as InputSearchSort[]
      }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("shoes")
      expect(params.get("p")).toBe("2")
      expect(params.get("filter.brand")).toBe("Nike")
      expect(params.get("sort")).toBe("price~asc")
    })

    it("creates URLSearchParams with range filter parameter", () => {
      const filters = [{ field: "price", range: [{ gte: "10", lte: "50" }] }]
      const params = expectFilters(filters)
      expect(params.get("filter.price.gte")).toBe("10")
      expect(params.get("filter.price.lte")).toBe("50")
    })

    it("creates URLSearchParams with partial range filters", () => {
      const filters = [
        { field: "price", range: [{ gte: "10" }] },
        { field: "weight", range: [{ lt: "100" }] }
      ]
      const params = expectFilters(filters)
      expect(params.get("filter.price.gte")).toBe("10")
      expect(params.get("filter.price.lte")).toBeNull()
      expect(params.get("filter.weight.lt")).toBe("100")
      expect(params.get("filter.weight.gt")).toBeNull()
    })

    it("creates URLSearchParams with all range operators", () => {
      const filters = [{ field: "score", range: [{ gt: "0", gte: "1", lt: "100", lte: "99" }] }]
      const params = expectFilters(filters)
      expect(params.get("filter.score.gt")).toBe("0")
      expect(params.get("filter.score.gte")).toBe("1")
      expect(params.get("filter.score.lt")).toBe("100")
      expect(params.get("filter.score.lte")).toBe("99")
    })

    it("handles mixed value and range filters", () => {
      const filters = [
        { field: "brand", value: ["Nike", "Adidas"] },
        { field: "price", range: [{ gte: "10", lte: "50" }] }
      ]
      const state = { filter: filters }
      const params = serializeQueryState(state)
      expect(params.toString()).toBe("filter.brand=Nike&filter.brand=Adidas&filter.price.gte=10&filter.price.lte=50")
    })

    it("omits undefined range values", () => {
      const filters = [{ field: "price", range: [{ gte: "10", lt: undefined, lte: "50" }] }]
      const state = { filter: filters }
      const params = serializeQueryState(state)
      expect(params.get("filter.price.gte")).toBe("10")
      expect(params.get("filter.price.lte")).toBe("50")
      expect(params.has("filter.price.lt")).toBe(false)
      expect(params.has("filter.price.gt")).toBe(false)
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
    it("parses query parameter", () => {
      const params = new URLSearchParams("q=test+search")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("test search")
      expect(state.page).toBeUndefined()
    })

    it("parses page parameter when greater than 1", () => {
      const params = new URLSearchParams("q=test&p=3")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("test")
      expect(state.page).toBe(3)
    })

    it("omits page parameter when equal to 1", () => {
      const params = new URLSearchParams("q=test&p=1")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("test")
      expect(state.page).toBeUndefined()
    })

    it("handles invalid page parameter", () => {
      const params = new URLSearchParams("q=test&p=invalid")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("test")
      expect(state.page).toBeUndefined()
    })

    it("handles empty parameters", () => {
      const params = new URLSearchParams("")
      const state = deserializeQueryState(params)
      expect(state).toEqual({})
    })

    it("ignores unknown parameters", () => {
      const params = new URLSearchParams("q=test&unknown=value&p=2")
      const state = deserializeQueryState(params)
      expect(state).toEqual({
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
      const params = new URLSearchParams("q=shoes&p=2&filter.brand=Nike&sort=price~asc")
      const state = deserializeQueryState(params)
      expect(state).toEqual({
        query: "shoes",
        page: 2,
        filter: [{ field: "brand", value: ["Nike"] }],
        sort: [{ field: "price", order: "asc" }]
      })
    })

    it("parses range filter parameters", () => {
      expectFilters("filter.price.gte=10&filter.price.lte=50").toEqual([
        { field: "price", range: [{ gte: "10", lte: "50" }] }
      ])
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
      window.location.search = "?q=shoes&p=2&filter.brand=Nike&sort=price~desc,_score~desc"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        query: "shoes",
        page: 2,
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

    it("preserves mixed value and range filter parameters", () => {
      window.location.search = "?filter.brand=Nike&filter.price.gte=10&filter.price.lte=50"
      const url = getPageUrl(2)
      expect(url).toBe("/?p=2&filter.brand=Nike&filter.price.gte=10&filter.price.lte=50")
    })
  })
})
