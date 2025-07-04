import { SerpConfig } from "@nosto/search-js/preact/serp"
import { createSortOption } from "./utils/sorting"
import { thumbnailDecorator } from "@nosto/search-js/thumbnails"
import { priceDecorator } from "@nosto/search-js/currencies"
import { InitProps } from "@nosto/nosto-js"
import { AutocompleteConfig } from "@nosto/search-js/preact/autocomplete"

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
  historySize: 5
}

export const hitDecorators = [thumbnailDecorator({ size: "2" }), priceDecorator({ defaultCurrency: "EUR" })] as const

export const serpConfig = {
  defaultCurrency: "EUR",
  search: {
    hitDecorators: hitDecorators
  }
} satisfies SerpConfig

export const autocompleteConfig = {
  defaultCurrency: "EUR",
  search: {
    hitDecorators: hitDecorators
  }
} satisfies AutocompleteConfig

export const initConfig = {
  merchantId: ""
} satisfies InitProps
