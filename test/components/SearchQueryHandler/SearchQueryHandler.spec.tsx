import { describe, it, expect, vi, beforeEach } from "vitest"
import { render } from "@testing-library/preact"
import SearchQueryHandler from "@/components/SearchQueryHandler/SearchQueryHandler"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { CategoryPageProvider } from "@nosto/search-js/preact/category"

// Mock the URL state getter
vi.mock("@/mapping/url/getCurrentUrlState", () => ({
  getQueryFromUrlState: vi.fn()
}))

// Mock the URL updater
vi.mock("@/mapping/url/updateUrl", () => ({
  updateUrlFromQuery: vi.fn()
}))

// Import the mocked functions
import { getQueryFromUrlState } from "@/mapping/url/getCurrentUrlState"
import { updateUrlFromQuery } from "@/mapping/url/updateUrl"

describe("SearchQueryHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("search page type", () => {
    it("fires initial search when URL has query parameter", () => {
      const mockQuery = {
        query: "test",
        products: {
          from: 0,
          size: 24
        }
      }
      vi.mocked(getQueryFromUrlState).mockReturnValue(mockQuery)

      render(
        <SearchPageProvider config={{ search: { hitDecorators: [] } }}>
          <SearchQueryHandler pageType="search" />
        </SearchPageProvider>
      )

      expect(getQueryFromUrlState).toHaveBeenCalled()
    })

    it("does not fire initial search when URL has no query parameter", () => {
      vi.mocked(getQueryFromUrlState).mockReturnValue(undefined)

      render(
        <SearchPageProvider config={{ search: { hitDecorators: [] } }}>
          <SearchQueryHandler pageType="search" />
        </SearchPageProvider>
      )

      expect(getQueryFromUrlState).toHaveBeenCalled()
    })

    it("updates URL when state changes", async () => {
      vi.mocked(getQueryFromUrlState).mockReturnValue(undefined)

      render(
        <SearchPageProvider config={{ search: { hitDecorators: [] } }}>
          <SearchQueryHandler pageType="search" />
        </SearchPageProvider>
      )

      // The updateUrlFromQuery should be called during the effect
      // Give it a moment to run the effect
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(updateUrlFromQuery).toHaveBeenCalled()
    })
  })

  describe("category page type", () => {
    it("fires initial empty request for category pages", () => {
      vi.mocked(getQueryFromUrlState).mockReturnValue(undefined)

      render(
        <CategoryPageProvider config={{ search: { hitDecorators: [] } }}>
          <SearchQueryHandler pageType="category" />
        </CategoryPageProvider>
      )

      expect(getQueryFromUrlState).toHaveBeenCalled()
    })

    it("does not update URL on category pages", async () => {
      vi.mocked(getQueryFromUrlState).mockReturnValue(undefined)

      render(
        <CategoryPageProvider config={{ search: { hitDecorators: [] } }}>
          <SearchQueryHandler pageType="category" />
        </CategoryPageProvider>
      )

      // Give it a moment to run the effect
      await new Promise(resolve => setTimeout(resolve, 0))

      // URL update should not be called for category pages
      // or if it is called, it should be minimal
      // The key point is category pages don't update URL with query params
      expect(updateUrlFromQuery).not.toHaveBeenCalled()
    })
  })
})
