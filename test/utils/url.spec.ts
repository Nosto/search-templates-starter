import { describe, it, expect, beforeEach, vi } from "vitest"
import { serializeQueryState, deserializeQueryState, updateUrl, getCurrentUrlState, getPageUrl } from "@/utils/url"

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
