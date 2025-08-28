import { describe, it, expect, beforeEach, vi } from "vitest"
import { serializeQueryState, deserializeQueryState, updateURL, getCurrentUrlState } from "../../src/utils/url"

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
      expect(state).toEqual({ query: "test", page: 2 })
    })
  })

  describe("updateURL", () => {
    beforeEach(() => {
      // Mock window.location and window.history
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/",
          search: ""
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
  })
})
