import { sizes, defaultConfig } from "@/config"
import { useActions, useSizeOptions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateUrl } from "@/utils/url"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)

  // Get current query, pagination, filter, and sort state from app
  const { query, from, filter, sort } = useNostoAppState(state => ({
    query: state.query?.query,
    from: state.query?.products?.from,
    filter: state.query?.products?.filter,
    sort: state.query?.products?.sort
  }))

  // Initialize search from URL on first load
  useEffect(() => {
    const { query, page, size, filter, sort } = getCurrentUrlState()
    if (query || page || size || filter || sort) {
      const from = page ? (page - 1) * (size || defaultConfig.serpSize) : 0

      const searchConfig = {
        query,
        products: {
          size: size || defaultConfig.serpSize,
          from,
          filter,
          sort
        }
      }

      newSearch(searchConfig)
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
