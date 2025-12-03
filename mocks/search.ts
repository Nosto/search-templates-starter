import { SearchQuery, SearchResult } from "@nosto/nosto-js/client"
import { mockKeywords } from "./keywords"
import { generateMockProducts } from "./products"

/**
 * Mock search function that returns mock data for testing purposes
 */
export async function mockSearch(query: SearchQuery) {
  const from = query.products?.from || 0
  const size = query.products?.size || 24
  const searchQuery = query.query || "shoes"

  // Return redirect for specific test query
  if (searchQuery === "redirect-test") {
    return {
      query: searchQuery,
      redirect: "https://example.com/redirected-page",
      products: {
        from,
        size,
        total: 0,
        hits: []
      },
      keywords: {
        from: 0,
        size: 0,
        total: 0,
        hits: []
      }
    } satisfies SearchResult
  }

  return {
    query: searchQuery,
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
