import { type SerpConfig } from "@nosto/search-js/preact/serp"
import { type State } from "@nosto/search-js/preact/common"
import { generateMockProducts } from "./products"

export const mockConfig: SerpConfig = {
  defaultCurrency: "EUR",
  search: {
    hitDecorators: []
  }
}

export const mockInitialState: Partial<State> = {
  loading: false,
  initialized: true,
  query: {
    query: "shoes",
    products: {
      filter: [
        {
          field: "color",
          value: ["red"]
        },
        {
          field: "price",
          range: [
            {
              gte: "50",
              lte: "150"
            }
          ]
        }
      ]
    }
  },
  response: {
    query: "shoes",
    products: {
      from: 1,
      size: 24,
      total: 142,
      hits: generateMockProducts(24)
    }
  }
}

// ============================================================================
// Facet Mock Data
// ============================================================================

export const mockCategoryFacet = {
  id: "category",
  name: "Category",
  field: "categories",
  type: "terms" as const,
  data: [
    { value: "shoes", count: 42, selected: false },
    { value: "clothing", count: 28, selected: true },
    { value: "accessories", count: 15, selected: false }
  ]
}

export const mockBrandFacet = {
  id: "brand",
  name: "Brand",
  field: "brand",
  type: "terms" as const,
  data: [
    { value: "nike", count: 125, selected: false },
    { value: "adidas", count: 98, selected: true },
    { value: "puma", count: 67, selected: false },
    { value: "reebok", count: 45, selected: false },
    { value: "new-balance", count: 34, selected: false },
    { value: "under-armour", count: 23, selected: false }
  ]
}

// ============================================================================
// Range Facet Mock Data
// ============================================================================

export const mockPriceFacet = {
  id: "price",
  name: "Price",
  field: "price",
  type: "stats" as const,
  min: 10,
  max: 500
}

export const mockRatingFacet = {
  id: "rating",
  name: "Customer Rating",
  field: "rating",
  type: "stats" as const,
  min: 1,
  max: 5
}

export const mockWeightFacet = {
  id: "weight",
  name: "Weight (kg)",
  field: "weight",
  type: "stats" as const,
  min: 0.1,
  max: 25.0
}

// ============================================================================
// Keyword Mock Data
// ============================================================================

export const mockKeyword = {
  keyword: "running shoes",
  _highlight: {
    keyword: "<b>running</b> shoes"
  },
  facets: [],
  priority: 1,
  total: 1
}

export const mockKeywordNoHighlight = {
  keyword: "sneakers",
  facets: [],
  priority: 1,
  total: 1
}

export const mockKeywords = {
  hits: [
    {
      keyword: "running shoes",
      _highlight: {
        keyword: "<b>running</b> shoes"
      },
      facets: [],
      priority: 1,
      total: 3
    },
    {
      keyword: "running gear",
      _highlight: {
        keyword: "<b>running</b> gear"
      },
      facets: [],
      priority: 2,
      total: 3
    },
    {
      keyword: "marathon training",
      _highlight: {
        keyword: "marathon training"
      },
      facets: [],
      priority: 3,
      total: 3
    }
  ],
  total: 3
}

export const mockEmptyKeywords = {
  hits: [],
  total: 0
}
