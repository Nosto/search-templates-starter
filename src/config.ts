import { createSortOption } from "./utils/sorting"
import { thumbnailDecorator } from "@nosto/search-js/thumbnails"
import { priceDecorator } from "@nosto/search-js/currencies"
import { AutocompleteConfig } from "@nosto/search-js/preact/autocomplete"
import { SerpConfig } from "@nosto/search-js/preact/serp"
import { handleDecorator } from "./decorators"
import { CategoryConfig } from "@nosto/search-js/preact/category"
import { SearchQuery } from "@nosto/nosto-js/client"

export const sizes = [24, 48, 72]

export const sortOptions = [
  createSortOption("score", "Most relevant", { field: "_score", order: "desc" }),
  createSortOption("-price", "Price descending", { field: "price", order: "desc" }),
  createSortOption("price", "Price ascending", { field: "price", order: "asc" })
]

export const defaultConfig = {
  sort: sortOptions[0],
  serpSize: sizes[0],
  historySize: 5
}

const thumbnailSize = "9" // 750x750
const defaultCurrency = "EUR"

function withBaseSize(query: SearchQuery) {
  return {
    ...query,
    products: {
      size: defaultConfig.serpSize,
      ...query.products
    }
  }
}

export const hitDecorators = [
  handleDecorator,
  thumbnailDecorator({ size: thumbnailSize }),
  priceDecorator({ defaultCurrency })
] as const

const baseConfig = {
  defaultCurrency,
  search: {
    hitDecorators
  },
  queryModifications: withBaseSize
}

export const serpConfig = {
  ...baseConfig,
  persistentSearchCache: false,
  preservePageScroll: false
} satisfies SerpConfig

export const autocompleteConfig = {
  ...baseConfig,
  queryModifications: query => ({
    ...query,
    products: {
      ...query.products,
      size: 5
    },
    keywords: {
      fields: ["keyword", "_highlight.keyword"],
      size: 5,
      facets: ["*"]
    }
  })
} satisfies AutocompleteConfig

export const categoryConfig = {
  ...baseConfig,
  persistentSearchCache: false,
  preservePageScroll: false
} satisfies CategoryConfig
