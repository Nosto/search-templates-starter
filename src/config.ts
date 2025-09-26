import { createSortOption } from "./utils/sorting"
import { thumbnailDecorator } from "@nosto/search-js/thumbnails"
import { priceDecorator } from "@nosto/search-js/currencies"
import { AutocompleteConfig } from "@nosto/search-js/preact/autocomplete"
import { SerpConfig } from "@nosto/search-js/preact/serp"
import { handleDecorator } from "./decorators"
import { CategoryConfig } from "@nosto/search-js/preact/category"
import { SearchQuery } from "@nosto/nosto-js/client"
import { tagging } from "./mapping/tagging"

export const sizes = [24, 48, 72]

export const sortOptions = [
  createSortOption("score", "Most relevant", { field: "_score", order: "desc" }),
  createSortOption("-price", "Price descending", { field: "price", order: "desc" }),
  createSortOption("price", "Price ascending", { field: "price", order: "asc" })
]

export const defaultConfig = {
  sort: sortOptions[0],
  serpSize: sizes[0]
}

const defaultCurrency = "EUR"

function withAutocompleteDefaults(query: SearchQuery) {
  return {
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
  } satisfies SearchQuery
}

function withBaseSize(query: SearchQuery) {
  return {
    ...query,
    products: {
      size: defaultConfig.serpSize,
      ...query.products
    }
  } satisfies SearchQuery
}

function withCategoryMetadata(query: SearchQuery) {
  const augmented = withBaseSize(query)
  return {
    ...augmented,
    products: {
      categoryId: tagging.categoryId(),
      categoryPath: tagging.categoryPath(),
      ...augmented.products
    }
  } satisfies SearchQuery
}

export const hitDecorators = [
  handleDecorator,
  // commented out, since thumbnails are handled via Image component
  //thumbnailDecorator({ size: "9" }), // 750x750
  priceDecorator({ defaultCurrency })
] as const

const autocompleteDecorators = [
  handleDecorator,
  thumbnailDecorator({ size: "7" }), // 400x400
  priceDecorator({ defaultCurrency })
]

export const baseConfig = {
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
  memoryCache: true,
  historyEnabled: true,
  historySize: 10,
  search: {
    hitDecorators: autocompleteDecorators
  },
  queryModifications: withAutocompleteDefaults
} satisfies AutocompleteConfig

export const categoryConfig = {
  ...baseConfig,
  persistentSearchCache: false,
  preservePageScroll: false,
  queryModifications: withCategoryMetadata
} satisfies CategoryConfig
