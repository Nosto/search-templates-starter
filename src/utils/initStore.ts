import { categoryConfig, defaultConfig, serpConfig } from "@/config"
import { tagging } from "@/mapping/tagging"
import { getCurrentUrlState } from "@/mapping/url/getCurrentUrlState"
import { createStore } from "@nosto/search-js/preact/common"
import { newSearch } from "@nosto/search-js/preact/legacy"

export function initStore(pageType: "category" | "search") {
  const store = createStore()
  const urlState = getCurrentUrlState()
  const config = pageType === "category" ? categoryConfig : serpConfig

  if (urlState.query && (pageType === "search" || pageType === "category")) {
    newSearch(
      {
        store,
        config: {
          ...config,
          pageType: "search"
        }
      },
      {
        query: urlState.query,
        products: {
          categoryId: pageType === "category" ? tagging.categoryId() : undefined,
          categoryPath: pageType === "category" ? tagging.categoryPath() : undefined,
          from: urlState.page ? (urlState.page - 1) * (urlState.size || defaultConfig.serpSize) : 0,
          filter: urlState.filter,
          sort: urlState.sort,
          size: urlState.size || defaultConfig.serpSize
        }
      }
    )
  }

  return store
}
