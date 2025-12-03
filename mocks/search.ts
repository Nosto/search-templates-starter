import { SearchQuery, SearchResult } from "@nosto/nosto-js/client"
import { mockKeywords } from "./keywords"
import { generateMockProducts } from "./products"

function createSearchResult(searchQuery: string, from: number, size: number, redirect?: string): SearchResult {
  const baseResult = {
    query: searchQuery,
    products: {
      from,
      size,
      total: redirect ? 0 : 10 * size,
      hits: redirect ? [] : generateMockProducts(size)
    },
    keywords: {
      from: 0,
      size: redirect ? 0 : mockKeywords.hits.length,
      total: redirect ? 0 : mockKeywords.hits.length,
      hits: redirect ? [] : mockKeywords.hits
    }
  }

  if (redirect) {
    return { ...baseResult, redirect } satisfies SearchResult
  }

  return baseResult satisfies SearchResult
}

/**
 * Mock search function that returns mock data for testing purposes
 */
export async function mockSearch(query: SearchQuery) {
  const from = query.products?.from || 0
  const size = query.products?.size || 24
  const searchQuery = query.query || "shoes"

  // Return redirect for specific test query
  if (searchQuery === "redirect-test") {
    return createSearchResult(searchQuery, from, size, "https://example.com/redirected-page")
  }

  return createSearchResult(searchQuery, from, size)
}
