import { SearchQuery } from "@nosto/nosto-js/client"
import { mockKeywords } from "./keywords"
import { generateMockProducts } from "./products"
import { mockCategoryFacet, mockBrandFacet, mockPriceFacet, mockRatingFacet } from "./facets"

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
      hits: mockKeywords.hits,
      total: mockKeywords.hits.length
    }
  }
}
