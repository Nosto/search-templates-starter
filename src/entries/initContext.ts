import { createQueryFromUrl } from "@/mapping/url/createQueryFromUrl"
import { categoryConfig, serpConfig } from "@/config"
import { createStore } from "@nosto/search-js/preact/common"
import { newSearch } from "@nosto/search-js/preact/legacy"

type WithPageType<C, T = "search" | "category"> = C & { pageType: T }
type Config = WithPageType<typeof categoryConfig, "category"> | WithPageType<typeof serpConfig, "search">

export function initContext(config: Config) {
  const store = createStore()
  const query = createQueryFromUrl()
  const { pageType, ...storeConfig } = config

  if (query || pageType === "category") {
    newSearch(
      {
        store,
        config
      },
      query
    )
  }

  return {
    store,
    config: storeConfig
  }
}
