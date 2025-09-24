import { SearchQuery, SearchResult } from "@nosto/nosto-js/client"
import { mockKeywords } from "./keywords"
import { generateMockProducts } from "./products"

/**
 * Mock search function that returns mock data for testing purposes
 */
export async function mockSearch(query: SearchQuery) {
  const from = query.products?.from || 0
  const size = query.products?.size || 24
  return {
    query: query.query || "shoes",
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
