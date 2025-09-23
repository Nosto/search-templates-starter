import { type SerpConfig } from "@nosto/search-js/preact/serp"
import { type State } from "@nosto/search-js/preact/common"
import { generateMockProducts } from "./products"
import { generateMockKeywords } from "./keywords"

export const mockConfig: SerpConfig = {
  defaultCurrency: "EUR",
  search: {
    hitDecorators: []
  }
}

export const mockInitialState = createMockState(24, 5)

export const mockAutocompleteState = createMockState(5, 5)

function createMockState(products: number, keywords: number) {
  return {
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
        from: 0,
        size: products,
        total: 142,
        hits: generateMockProducts(products)
      },
      keywords: {
        from: 0,
        size: keywords,
        total: keywords,
        hits: generateMockKeywords(keywords)
      }
    }
  } as Partial<State>
}
