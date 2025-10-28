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

export const shopifyMode = !!window.Shopify

/**
 * Default values for sort and page size for search results and categories
 */
export const defaultConfig = {
  sort: sortOptions[0],
  serpSize: sizes[0]
}

/**
 * CSS selectors for the Injected mode
 */
export const selectors = {
  // autocomplete dropdown container
  dropdown: "#dropdown",
  // search input field
  searchInput: "#search",
  // search form element selector
  searchForm: "#search-form",
  // container for actual search/category results
  results: "#serp"
}

const defaultCurrency = "EUR"

/**
 * Base hit decorator definitions for the search results.
 *
 * Decorators are transformer functions applied in order to all results returned
 * from the search backend. You may define your own decorators using `handleDecorator`
 * as an example.
 * The type for decorated products is defined in `src/types.ts`.
 */
export const hitDecorators = [handleDecorator, priceDecorator()] as const

/**
 * Shared configuration for all page types (Autocomplete, Category, Search)
 */
export const baseConfig = {
  defaultCurrency,
  search: {
    hitDecorators
  },
  queryModifications: withBaseConfig
}

function withBaseConfig(query: SearchQuery) {
  return {
    ...query,
    products: {
      size: defaultConfig.serpSize,
      ...query.products
      // uncomment for exchange rates based multi-currency support
      //currency: tagging.variation() ?? defaultCurrency

      // uncomment for price variation based multi-currency support
      //variationId: tagging.variation() ?? defaultCurrency
    }
  } satisfies SearchQuery
}

/**
 * Autocomplete configuration
 */

export const autocompleteConfig = {
  ...baseConfig,
  memoryCache: true,
  historyEnabled: true,
  historySize: 10,
  search: {
    hitDecorators: [
      ...hitDecorators,
      thumbnailDecorator({ size: "8" }) // 400x400
    ]
  },
  queryModifications: withAutocompleteDefaults
} satisfies AutocompleteConfig

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

/**
 * Category page configuration
 */

export const categoryConfig = {
  ...baseConfig,
  persistentSearchCache: false,
  preservePageScroll: false,
  queryModifications: withCategoryMetadata
} satisfies CategoryConfig

function withCategoryMetadata(query: SearchQuery) {
  const augmented = withBaseConfig(query)
  return {
    ...augmented,
    products: {
      categoryId: tagging.categoryId(),
      categoryPath: tagging.categoryPath(),
      ...augmented.products
    }
  } satisfies SearchQuery
}

/**
 * Search result page (serp) configuration
 */
export const serpConfig = {
  ...baseConfig,
  persistentSearchCache: false,
  preservePageScroll: false
} satisfies SerpConfig
