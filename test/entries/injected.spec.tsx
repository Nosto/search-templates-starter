import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/preact"
import { usePopState } from "@/hooks/usePopState"
import { useState } from "preact/compat"
import type { PageType } from "@nosto/nosto-js/client"

// Mock modules
vi.mock("@/config", () => ({
  searchPath: "/search"
}))

vi.mock("@/mapping/tagging", () => ({
  tagging: {
    pageType: vi.fn() as () => PageType
  }
}))

describe("injected entry - page type adjustment on navigation", () => {
  let originalLocation: Location

  beforeEach(() => {
    originalLocation = window.location
    // Mock window.location
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
        search: "",
        href: "http://localhost/"
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
    vi.clearAllMocks()
  })

  describe("page type switching on browser navigation (redirectOnSearch = false)", () => {
    it("should switch to search page type when pathname matches searchPath", async () => {
      const { tagging } = await import("@/mapping/tagging")
      const { searchPath } = await import("@/config")

      // Mock tagging.pageType to return 'category'
      vi.mocked(tagging.pageType).mockReturnValue("category")

      // Simulate the App component's logic
      const { result } = renderHook(() => {
        const [pageType, setPageType] = useState<PageType>(() => tagging.pageType() as PageType)
        const redirectOnSearch = false

        usePopState(() => {
          if (redirectOnSearch) return
          const isSearchPage = location.pathname === searchPath
          setPageType(isSearchPage ? "search" : (tagging.pageType() as PageType))
        }, [setPageType])

        return pageType
      })

      // Initial state should be 'category'
      expect(result.current).toBe("category")

      // Simulate navigation to search page
      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            pathname: "/search",
            search: "?q=test",
            href: "http://localhost/search?q=test"
          },
          writable: true,
          configurable: true
        })
        window.dispatchEvent(new PopStateEvent("popstate"))
      })

      // Page type should switch to 'search'
      expect(result.current).toBe("search")
    })

    it("should switch to underlying page type when pathname does not match searchPath", async () => {
      const { tagging } = await import("@/mapping/tagging")
      const { searchPath } = await import("@/config")

      // Mock tagging.pageType to return 'category'
      vi.mocked(tagging.pageType).mockReturnValue("category")

      // Simulate the App component's logic starting on search page
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/search",
          search: "?q=test",
          href: "http://localhost/search?q=test"
        },
        writable: true,
        configurable: true
      })

      const { result } = renderHook(() => {
        const [pageType, setPageType] = useState<PageType>("search")
        const redirectOnSearch = false

        usePopState(() => {
          if (redirectOnSearch) return
          const isSearchPage = location.pathname === searchPath
          setPageType(isSearchPage ? "search" : (tagging.pageType() as PageType))
        }, [setPageType])

        return pageType
      })

      // Initial state should be 'search'
      expect(result.current).toBe("search")

      // Simulate navigation back to category page
      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            pathname: "/category",
            search: "",
            href: "http://localhost/category"
          },
          writable: true,
          configurable: true
        })
        window.dispatchEvent(new PopStateEvent("popstate"))
      })

      // Page type should switch to 'category'
      expect(result.current).toBe("category")
    })

    it("should handle multiple back/forward navigations correctly", async () => {
      const { tagging } = await import("@/mapping/tagging")
      const { searchPath } = await import("@/config")

      // Mock tagging.pageType to return 'other'
      vi.mocked(tagging.pageType).mockReturnValue("other")

      // Start on a non-search page
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/",
          search: "",
          href: "http://localhost/"
        },
        writable: true,
        configurable: true
      })

      const { result } = renderHook(() => {
        const [pageType, setPageType] = useState<PageType>(() => tagging.pageType() as PageType)
        const redirectOnSearch = false

        usePopState(() => {
          if (redirectOnSearch) return
          const isSearchPage = location.pathname === searchPath
          setPageType(isSearchPage ? "search" : (tagging.pageType() as PageType))
        }, [setPageType])

        return pageType
      })

      // Initial state should be 'other'
      expect(result.current).toBe("other")

      // Navigate to search page
      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            pathname: "/search",
            search: "?q=shoes",
            href: "http://localhost/search?q=shoes"
          },
          writable: true,
          configurable: true
        })
        window.dispatchEvent(new PopStateEvent("popstate"))
      })

      expect(result.current).toBe("search")

      // Navigate back to non-search page
      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            pathname: "/",
            search: "",
            href: "http://localhost/"
          },
          writable: true,
          configurable: true
        })
        window.dispatchEvent(new PopStateEvent("popstate"))
      })

      expect(result.current).toBe("other")

      // Navigate forward to search page again
      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            pathname: "/search",
            search: "?q=shoes",
            href: "http://localhost/search?q=shoes"
          },
          writable: true,
          configurable: true
        })
        window.dispatchEvent(new PopStateEvent("popstate"))
      })

      expect(result.current).toBe("search")
    })
  })

  describe("page type behavior when redirectOnSearch = true", () => {
    it("should not change page type on popstate when redirectOnSearch is true", async () => {
      const { tagging } = await import("@/mapping/tagging")

      // Mock tagging.pageType to return 'category'
      vi.mocked(tagging.pageType).mockReturnValue("category")

      const { result } = renderHook(() => {
        const [pageType, setPageType] = useState<PageType>(() => tagging.pageType() as PageType)
        const redirectOnSearch = true

        usePopState(() => {
          if (redirectOnSearch) return
          const isSearchPage = location.pathname === "/search"
          setPageType(isSearchPage ? "search" : (tagging.pageType() as PageType))
        }, [setPageType])

        return pageType
      })

      // Initial state should be 'category'
      expect(result.current).toBe("category")

      // Simulate navigation to search page
      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            pathname: "/search",
            search: "?q=test",
            href: "http://localhost/search?q=test"
          },
          writable: true,
          configurable: true
        })
        window.dispatchEvent(new PopStateEvent("popstate"))
      })

      // Page type should remain 'category' because redirectOnSearch is true
      expect(result.current).toBe("category")
    })
  })

  describe("page type detection with different page types", () => {
    it("should correctly handle product page type", async () => {
      const { tagging } = await import("@/mapping/tagging")
      const { searchPath } = await import("@/config")

      // Mock tagging.pageType to return 'product'
      vi.mocked(tagging.pageType).mockReturnValue("product")

      Object.defineProperty(window, "location", {
        value: {
          pathname: "/product/123",
          search: "",
          href: "http://localhost/product/123"
        },
        writable: true,
        configurable: true
      })

      const { result } = renderHook(() => {
        const [pageType, setPageType] = useState<PageType>(() => tagging.pageType() as PageType)
        const redirectOnSearch = false

        usePopState(() => {
          if (redirectOnSearch) return
          const isSearchPage = location.pathname === searchPath
          setPageType(isSearchPage ? "search" : (tagging.pageType() as PageType))
        }, [setPageType])

        return pageType
      })

      expect(result.current).toBe("product")

      // Navigate to search
      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            pathname: "/search",
            search: "?q=test",
            href: "http://localhost/search?q=test"
          },
          writable: true,
          configurable: true
        })
        window.dispatchEvent(new PopStateEvent("popstate"))
      })

      expect(result.current).toBe("search")

      // Navigate back to product page
      act(() => {
        Object.defineProperty(window, "location", {
          value: {
            pathname: "/product/123",
            search: "",
            href: "http://localhost/product/123"
          },
          writable: true,
          configurable: true
        })
        window.dispatchEvent(new PopStateEvent("popstate"))
      })

      expect(result.current).toBe("product")
    })
  })
})
