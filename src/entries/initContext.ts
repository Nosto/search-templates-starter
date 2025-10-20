import { createQueryFromUrl } from "@/mapping/url/createQueryFromUrl"
import { categoryConfig, serpConfig } from "@/config"
import { createStore } from "@nosto/search-js/preact/common"
import { newSearch } from "@nosto/search-js/preact/legacy"
import { PageType } from "@nosto/nosto-js/client"
import { CategoryConfig } from "@nosto/search-js/preact/category"
import { SerpConfig } from "@nosto/search-js/preact/serp"

export function initContext(pageType: PageType, config: CategoryConfig | SerpConfig) {
  const store = createStore()
  const query = createQueryFromUrl()

  if (pageType !== "category" && pageType !== "search") {
    throw new Error(`Unsupported pageType: ${pageType}`)
  }

  const defaultConfig = pageType === "category" ? categoryConfig : serpConfig

  if (query.query || pageType === "category") {
    newSearch(
      {
        store,
        config: {
          ...defaultConfig,
          ...config,
          pageType
        }
      },
      query
    )
  }

  return {
    store,
    config
  }
}
