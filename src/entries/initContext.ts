import { createQueryFromUrl } from "@/mapping/url/createQueryFromUrl"
import { categoryConfig, serpConfig } from "@/config"
import { createStore } from "@nosto/search-js/preact/common"
import { newSearch } from "@nosto/search-js/preact/legacy"

type Config = typeof categoryConfig | typeof serpConfig
type PageType = "search" | "category"

export function initContext(pageType: PageType, config: Config) {
  const store = createStore()
  const query = createQueryFromUrl()

  if (query || pageType === "category") {
    newSearch(
      {
        store,
        config: {
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
