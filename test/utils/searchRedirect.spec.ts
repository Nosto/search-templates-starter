import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { redirectToSearch } from "@/utils/searchRedirect"

describe("redirectToSearch", () => {
  let originalLocation: Location
  const mockAssign = vi.fn()

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

  it("sets location.href with query parameter", () => {
    let hrefValue = ""
    Object.defineProperty(window.location, "href", {
      set: (value: string) => {
        hrefValue = value
      },
      get: () => hrefValue
    })

    redirectToSearch("test query")
    expect(hrefValue).toBe("https://example.com/?q=test+query")
  })

  it("trims whitespace from query", () => {
    let hrefValue = ""
    Object.defineProperty(window.location, "href", {
      set: (value: string) => {
        hrefValue = value
      },
      get: () => hrefValue
    })

    redirectToSearch("  test query  ")
    expect(hrefValue).toBe("https://example.com/?q=test+query")
  })

  it("does not redirect when query is empty", () => {
    let hrefValue = "initial"
    Object.defineProperty(window.location, "href", {
      set: (value: string) => {
        hrefValue = value
      },
      get: () => hrefValue
    })

    redirectToSearch("")
    expect(hrefValue).toBe("initial")
  })

  it("does not redirect when query is only whitespace", () => {
    let hrefValue = "initial"
    Object.defineProperty(window.location, "href", {
      set: (value: string) => {
        hrefValue = value
      },
      get: () => hrefValue
    })

    redirectToSearch("   ")
    expect(hrefValue).toBe("initial")
  })

  it("properly encodes special characters in query", () => {
    let hrefValue = ""
    Object.defineProperty(window.location, "href", {
      set: (value: string) => {
        hrefValue = value
      },
      get: () => hrefValue
    })

    redirectToSearch("test & query")
    expect(hrefValue).toBe("https://example.com/?q=test+%26+query")
  })
})
