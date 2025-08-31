import { describe, it, expect, beforeEach, vi } from "vitest"
import { serializeQueryState, deserializeQueryState, updateURL, getCurrentUrlState } from "@/utils/url"

describe("URL utilities", () => {
  describe("serializeQueryState", () => {
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
      const state = {
        query: "test",
        filter: [
          { field: "brand", value: ["Nike"] },
          { field: "color", value: ["Red"] }
        ]
      }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("test")
      expect(params.get("filter.brand")).toBe("Nike")
      expect(params.get("filter.color")).toBe("Red")
    })

    it("omits empty filter array", () => {
      const state = { query: "test", filter: [] }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("test")
      expect(params.has("filter.brand")).toBe(false)
      expect(params.has("filter.color")).toBe(false)
    })

    it("handles filters with query and page", () => {
      const state = {
        query: "shoes",
        page: 2,
        filter: [{ field: "category", value: ["sports"] }]
      }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("shoes")
      expect(params.get("p")).toBe("2")
      expect(params.get("filter.category")).toBe("sports")
    })

    it("spreads array filter values to multiple parameters", () => {
      const state = {
        query: "shoes",
        filter: [{ field: "brand", value: ["Nike", "Adidas", "Puma"] }]
      }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("shoes")
      expect(params.getAll("filter.brand")).toEqual(["Nike", "Adidas", "Puma"])
    })

    it("handles mixed single and array filter values", () => {
      const state = {
        filter: [
          { field: "brand", value: ["Nike", "Adidas"] },
          { field: "color", value: ["Red"] },
          { field: "size", value: ["8", "9", "10"] }
        ]
      }
      const params = serializeQueryState(state)
      expect(params.getAll("filter.brand")).toEqual(["Nike", "Adidas"])
      expect(params.get("filter.color")).toBe("Red")
      expect(params.getAll("filter.size")).toEqual(["8", "9", "10"])
    })

    it("creates URLSearchParams with sort parameter", () => {
      const state = { query: "test", sort: "price" }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("test")
      expect(params.get("sort")).toBe("price")
    })

    it("omits empty sort parameter", () => {
      const state = { query: "test", sort: "" }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("test")
      expect(params.get("sort")).toBeNull()
    })

    it("creates URLSearchParams with all parameters", () => {
      const state = {
        query: "shoes",
        page: 2,
        sort: "-price",
        filter: [{ field: "brand", value: ["Nike"] }]
      }
      const params = serializeQueryState(state)
      expect(params.get("q")).toBe("shoes")
      expect(params.get("p")).toBe("2")
      expect(params.get("sort")).toBe("-price")
      expect(params.get("filter.brand")).toBe("Nike")
    })
  })

  describe("deserializeQueryState", () => {
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
      const params = new URLSearchParams("q=test&filter.brand=Nike&filter.color=Red")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("test")
      expect(state.filter).toEqual([
        { field: "brand", value: ["Nike"] },
        { field: "color", value: ["Red"] }
      ])
    })

    it("parses single filter", () => {
      const params = new URLSearchParams("filter.category=shoes")
      const state = deserializeQueryState(params)
      expect(state.filter).toEqual([{ field: "category", value: ["shoes"] }])
    })

    it("handles malformed filter parameter", () => {
      const params = new URLSearchParams("filter.invalid=&filter.empty=")
      const state = deserializeQueryState(params)
      expect(state.filter).toBeUndefined()
    })

    it("filters out empty field/value pairs", () => {
      const params = new URLSearchParams("filter.brand=Nike&filter.empty=&filter.color=")
      const state = deserializeQueryState(params)
      expect(state.filter).toEqual([{ field: "brand", value: ["Nike"] }])
    })

    it("handles URL encoded filter values", () => {
      const params = new URLSearchParams("filter.brand=Nike+Air&filter.color=Dark+Blue")
      const state = deserializeQueryState(params)
      expect(state.filter).toEqual([
        { field: "brand", value: ["Nike Air"] },
        { field: "color", value: ["Dark Blue"] }
      ])
    })

    it("parses multiple filter parameters as array", () => {
      const params = new URLSearchParams("filter.brand=Nike&filter.brand=Adidas&filter.brand=Puma")
      const state = deserializeQueryState(params)
      expect(state.filter).toEqual([{ field: "brand", value: ["Nike", "Adidas", "Puma"] }])
    })

    it("handles mixed single and multiple filter parameters", () => {
      const params = new URLSearchParams(
        "filter.brand=Nike&filter.brand=Adidas&filter.color=Red&filter.size=8&filter.size=9"
      )
      const state = deserializeQueryState(params)
      expect(state.filter).toEqual([
        { field: "brand", value: ["Nike", "Adidas"] },
        { field: "color", value: ["Red"] },
        { field: "size", value: ["8", "9"] }
      ])
    })

    it("parses sort parameter", () => {
      const params = new URLSearchParams("q=test&sort=price")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("test")
      expect(state.sort).toBe("price")
    })

    it("parses sort parameter with special characters", () => {
      const params = new URLSearchParams("q=test&sort=-price")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("test")
      expect(state.sort).toBe("-price")
    })

    it("omits empty sort parameter", () => {
      const params = new URLSearchParams("q=test&sort=")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("test")
      expect(state.sort).toBeUndefined()
    })

    it("parses all parameters including sort", () => {
      const params = new URLSearchParams("q=shoes&p=2&sort=score&filter.brand=Nike")
      const state = deserializeQueryState(params)
      expect(state.query).toBe("shoes")
      expect(state.page).toBe(2)
      expect(state.sort).toBe("score")
      expect(state.filter).toEqual([{ field: "brand", value: ["Nike"] }])
    })
  })

  describe("updateURL", () => {
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
      updateURL(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?q=test+search&p=2")
    })

    it("updates URL without parameters when state is empty", () => {
      const state = {}
      updateURL(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/")
    })

    it("preserves pathname", () => {
      window.location.pathname = "/some/path"
      const state = { query: "test" }
      updateURL(state)
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
      updateURL(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?q=shoes&filter.brand=Nike&filter.color=Red")
    })

    it("updates URL with query, page, and filter parameters", () => {
      const state = {
        query: "sneakers",
        page: 3,
        filter: [{ field: "category", value: ["sports"] }]
      }
      updateURL(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?q=sneakers&p=3&filter.category=sports")
    })

    it("updates URL with only filter parameters", () => {
      const state = { filter: [{ field: "brand", value: ["Adidas"] }] }
      updateURL(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?filter.brand=Adidas")
    })

    it("updates URL with array filter parameters", () => {
      const state = {
        filter: [{ field: "brand", value: ["Nike", "Adidas", "Puma"] }]
      }
      updateURL(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(
        null,
        "",
        "/?filter.brand=Nike&filter.brand=Adidas&filter.brand=Puma"
      )
    })

    it("updates URL with sort parameter", () => {
      const state = { query: "test", sort: "price" }
      updateURL(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?q=test&sort=price")
    })

    it("updates URL with all parameters including sort", () => {
      const state = {
        query: "shoes",
        page: 2,
        sort: "-price",
        filter: [{ field: "brand", value: ["Nike"] }]
      }
      updateURL(state)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/?q=shoes&p=2&sort=-price&filter.brand=Nike")
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
      window.location.search = "?q=test&sort=price"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        query: "test",
        sort: "price"
      })
    })

    it("parses all parameters from URL", () => {
      window.location.search = "?q=shoes&p=2&sort=-price&filter.brand=Nike"
      const state = getCurrentUrlState()
      expect(state).toEqual({
        query: "shoes",
        page: 2,
        sort: "-price",
        filter: [{ field: "brand", value: ["Nike"] }]
      })
    })
  })
})
