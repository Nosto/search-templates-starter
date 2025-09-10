import { mockInitialState } from "./mocks"

/**
 * Mock search function that returns mock data for testing purposes
 */
export const mockSearch = async (query: { query?: string }) => {
  // Return mock search result based on mockInitialState
  return {
    query: query.query || "shoes",
    products: mockInitialState.response?.products || {
      from: 1,
      size: 24,
      total: 0,
      hits: []
    },
    keywords: {
      hits: [],
      total: 0
    }
  }
}
