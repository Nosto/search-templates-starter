import { createSortOption } from "./utils/sorting"
import { thumbnailDecorator } from "@nosto/search-js/thumbnails"
import { priceDecorator } from "@nosto/search-js/currencies"
import { AutocompleteConfig } from "@nosto/search-js/preact/autocomplete"
import { SerpConfig } from "@nosto/search-js/preact/serp"
import { handleDecorator } from "./decorators"
import { CategoryConfig } from "@nosto/search-js/preact/category"

export const sizes = [24, 48, 72]

export const sortOptions = [
  createSortOption("score", "Most relevant", { field: "_score", order: "desc" }),
  createSortOption("-price", "Price descending", { field: "price", order: "desc" }),
  createSortOption("price", "Price ascending", { field: "price", order: "asc" })
]

export const defaultConfig = {
  sort: sortOptions[0],
  serpSize: sizes[0],
  autocompleteProductsSize: 4,
  autocompleteKeywordsSize: 5,
  historySize: 5,
  useSkeletonLoading: false
}

const thumbnailSize = "9" // 750x750
const defaultCurrency = "EUR"

export const hitDecorators = [
  handleDecorator,
  thumbnailDecorator({ size: thumbnailSize }),
  priceDecorator({ defaultCurrency })
] as const

export const serpConfig = {
  defaultCurrency,
  search: {
    hitDecorators
  }
} satisfies SerpConfig

export const autocompleteConfig = {
  defaultCurrency,
  search: {
    hitDecorators
  }
} satisfies AutocompleteConfig

export const categoryConfig = {
  defaultCurrency,
  search: {
    hitDecorators
  },
  persistentSearchCache: false,
  preservePageScroll: false
} satisfies CategoryConfig
