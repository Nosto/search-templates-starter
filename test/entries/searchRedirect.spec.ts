import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { searchRedirect } from "@/entries/searchRedirect"

describe("searchRedirect", () => {
  let originalLocation: Location

  beforeEach(() => {
    originalLocation = window.location
    // Mock window.location with proper setter
    Object.defineProperty(window, "location", {
      value: {
        ...originalLocation,
        href: originalLocation.href,
        origin: "https://example.com",
        pathname: "/test"
      },
      writable: true,
      configurable: true
    })
  })

  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
      configurable: true
    })
  })

  function mockLocationHref(initialValue = "") {
    let hrefValue = initialValue
    Object.defineProperty(window.location, "href", {
      set: (value: string) => {
        hrefValue = value
      },
      get: () => hrefValue
    })
    return () => hrefValue
  }

  it("sets location.href with query parameter", () => {
    const getHref = mockLocationHref()
    searchRedirect("test query")
    expect(getHref()).toBe("https://example.com/search?q=test+query")
  })

  it("trims whitespace from query", () => {
    const getHref = mockLocationHref()
    searchRedirect("  test query  ")
    expect(getHref()).toBe("https://example.com/search?q=test+query")
  })

  it("does not redirect when query is empty", () => {
    const getHref = mockLocationHref("initial")
    searchRedirect("")
    expect(getHref()).toBe("initial")
  })

  it("does not redirect when query is only whitespace", () => {
    const getHref = mockLocationHref("initial")
    searchRedirect("   ")
    expect(getHref()).toBe("initial")
  })

  it("properly encodes special characters in query", () => {
    const getHref = mockLocationHref()
    searchRedirect("test & query")
    expect(getHref()).toBe("https://example.com/search?q=test+%26+query")
  })
})
