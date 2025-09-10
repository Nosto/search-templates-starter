import { mockKeywords } from "./keywords"
import { generateMockProducts } from "./products"

/**
 * Mock search function that returns mock data for testing purposes
 */
export async function mockSearch(query: { query?: string }) {
  return {
    query: query.query || "shoes",
    products: {
      from: 0,
      size: 24,
      total: 24,
      hits: generateMockProducts(24)
    },
    keywords: {
      hits: mockKeywords.hits,
      total: mockKeywords.hits.length
    }
  }
}
