import { type SerpConfig } from "@nosto/search-js/preact/serp"
import { type State } from "@nosto/search-js/preact/common"
import { generateMockProducts } from "./products"
import { mockCategoryFacet, mockBrandFacet, mockPriceFacet, mockRatingFacet } from "./facets"

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
