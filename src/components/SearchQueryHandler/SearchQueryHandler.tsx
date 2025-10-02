import { defaultConfig } from "@/config"
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { updateUrl } from "@/mapping/url/updateUrl"
import { getSearchConfigFromCurrentUrl } from "@/mapping/url/urlToSearchConfig"
import { hasTriggeredInitialSearch, onEarlySearchTriggered, markSearchCompleted } from "@/utils/earlySearchManager"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()

  // Get current query, pagination, filter, and sort state from app
  const { query, from, filter, size, sort } = useNostoAppState(state => ({
    query: state.query?.query,
    from: state.query?.products?.from,
    filter: state.query?.products?.filter,
    size: state.query?.products?.size ?? defaultConfig.serpSize,
    sort: state.query?.products?.sort
  }))

  // Initialize search from URL on first load or hydrate from early search
  useEffect(() => {
    // Check if early search system already triggered the initial search
    if (hasTriggeredInitialSearch()) {
      // Early search was triggered, listen for it to complete the hydration
      const unsubscribe = onEarlySearchTriggered(searchConfig => {
        newSearch(searchConfig)
        markSearchCompleted()
      })
      return unsubscribe
    } else {
      // Fallback: trigger search manually if early search didn't happen
      const searchConfig = getSearchConfigFromCurrentUrl()
      if (searchConfig) {
        newSearch(searchConfig)
      }
    }
  }, [newSearch])

  // Update URL when app state changes
  useEffect(() => {
    const page = from ? Math.floor(from / size) + 1 : 1

    updateUrl({
      query,
      page,
      size,
      filter,
      sort
    })
  }, [query, from, size, filter, sort])

  return null
}
