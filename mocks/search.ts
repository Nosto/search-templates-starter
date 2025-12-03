import { SearchQuery, SearchResult } from "@nosto/nosto-js/client"
import { mockKeywords } from "./keywords"
import { generateMockProducts } from "./products"

function createSearchResult(searchQuery: string, from: number, size: number, redirect?: string): SearchResult {
  return {
    query: searchQuery,
    redirect,
    products: {
      from,
      size,
      total: 10 * size,
      hits: generateMockProducts(size)
    },
    keywords: {
      from: 0,
      size: mockKeywords.hits.length,
      total: mockKeywords.hits.length,
      hits: mockKeywords.hits
    }
  } satisfies SearchResult
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
