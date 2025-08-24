import { render } from "@testing-library/preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"
import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { State } from "@nosto/search-js/preact"
import { serpConfig, autocompleteConfig } from "../../src/config"
import { SearchProduct, SearchFacet, SearchResult } from "@nosto/nosto-js/client"

// Mock product data for testing
export const mockProducts: SearchProduct[] = [
  {
    productId: "1",
    name: "Test Product 1",
    brand: "Test Brand",
    url: "/product/1",
    imageUrl: "https://example.com/image1.jpg",
    price: 29.99,
    priceText: "$29.99",
    listPrice: 39.99,
    availability: "in-stock"
  },
  {
    productId: "2",
    name: "Test Product 2",
    brand: "Test Brand",
    url: "/product/2",
    imageUrl: "https://example.com/image2.jpg",
    price: 19.99,
    priceText: "$19.99",
    availability: "in-stock"
  },
  {
    productId: "3",
    name: "Test Product 3",
    brand: "Another Brand",
    url: "/product/3",
    imageUrl: "https://example.com/image3.jpg",
    price: 49.99,
    priceText: "$49.99",
    availability: "in-stock"
  }
]

// Mock filters data for testing
export const mockFilters: SearchFacet[] = [
  {
    id: "brand",
    name: "Brand",
    type: "terms" as const,
    data: [
      { key: "test-brand", doc_count: 5, name: "Test Brand" },
      { key: "another-brand", doc_count: 3, name: "Another Brand" }
    ]
  },
  {
    id: "price",
    name: "Price",
    type: "range" as const,
    data: {
      min: 0,
      max: 100
    }
  }
]

// Mock search response with non-empty state
export const mockSearchResponse: SearchResult = {
  query: "test search",
  products: {
    total: mockProducts.length,
    hits: mockProducts
  },
  facets: mockFilters,
  redirect: null
}

// Mock query for comprehensive state testing
export const mockQuery = {
  q: "test search",
  filters: {},
  sort: "relevance",
  size: 24,
  from: 0
}

// Mock state for components that need non-empty data
export const mockNonEmptyState: Partial<State> = {
  loading: false,
  initialized: true,
  query: mockQuery,
  response: mockSearchResponse
}

// Test wrapper with SearchPageProvider
export function renderWithSearchProvider(ui: preact.JSX.Element) {
  return render(<SearchPageProvider config={serpConfig}>{ui}</SearchPageProvider>)
}

// Test wrapper with AutocompletePageProvider
export function renderWithAutocompleteProvider(ui: preact.JSX.Element) {
  return render(<AutocompletePageProvider config={autocompleteConfig}>{ui}</AutocompletePageProvider>)
}

// Test wrapper with both providers (for components that might need both)
export function renderWithProviders(ui: preact.JSX.Element) {
  return render(
    <SearchPageProvider config={serpConfig}>
      <AutocompletePageProvider config={autocompleteConfig}>{ui}</AutocompletePageProvider>
    </SearchPageProvider>
  )
}
