import { SearchFacet, SearchQuery, SearchResult } from "@nosto/nosto-js/client"
import { mockKeywords } from "./keywords"
import { generateMockProducts } from "./products"

/**
 * Creates a search result with optional redirect
 */
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

export type MockSearch = (query: SearchQuery) => Promise<SearchResult>

export function isAutocompleteQuery(query: SearchQuery) {
  return !!query.keywords
}

/**
 * Mock search that fails as if the Nosto search service were unavailable
 */
export function mockUnavailableSearch(status = 503): MockSearch {
  return async () => {
    throw Object.assign(new Error(`Status ${status}`), { status })
  }
}

/**
 * Mock search whose response passes the search action but has a facet the template can't render
 */
export function mockMalformedSearch(): MockSearch {
  return async query => {
    const result = await mockSearch(query)
    if (result.products) {
      result.products.facets = [unrenderableFacet]
    }
    return result
  }
}

const unrenderableFacet = null as unknown as SearchFacet

/**
 * Mock search where autocomplete is unavailable but result searches work
 */
export function mockFailingAutocomplete(): MockSearch {
  return async query => {
    if (isAutocompleteQuery(query)) {
      throw Object.assign(new Error("Status 503"), { status: 503 })
    }
    return mockSearch(query)
  }
}
