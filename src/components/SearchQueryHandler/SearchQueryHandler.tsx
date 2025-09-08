import { defaultConfig } from "@/config"
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateUrl } from "@/utils/url"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()

  // Get current query, pagination, filter, and sort state from app
  const { query, from, filter, sort, size } = useNostoAppState(state => ({
    query: state.query?.query,
    from: state.query?.products?.from,
    filter: state.query?.products?.filter,
    sort: state.query?.products?.sort,
    size: state.query?.products?.size
  }))

  // Initialize search from URL on first load
  useEffect(() => {
    const urlStateParams = getCurrentUrlState()
    if (!Object.values(urlStateParams).some(Boolean)) {
      return
    }

    const { query, page, size: urlSize, filter, sort } = urlStateParams
    const effectiveSize = urlSize || defaultConfig.serpSize
    const from = page ? (page - 1) * effectiveSize : 0

    const searchConfig = {
      query,
      products: {
        size: effectiveSize,
        from,
        filter,
        sort
      }
    }

    newSearch(searchConfig)
  }, [newSearch, size])

  // Update URL when app state changes
  useEffect(() => {
    const page = from ? Math.floor(from / (size || defaultConfig.serpSize)) + 1 : 1

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
