import { createQueryFromUrl } from "@/mapping/url/createQueryFromUrl"
import { categoryConfig, serpConfig } from "@/config"
import { createStore } from "@nosto/search-js/preact/common"
import { newSearch } from "@nosto/search-js/preact/legacy"
import { PageType } from "@nosto/nosto-js/client"

type Config = typeof categoryConfig | typeof serpConfig

export function initContext(pageType: PageType, config: Config) {
  const store = createStore()
  const query = createQueryFromUrl()

  if (pageType !== "category" && pageType !== "search") {
    throw new Error(`Unsupported pageType: ${pageType}`)
  }
  
  if (query.query || pageType === "category") {
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
