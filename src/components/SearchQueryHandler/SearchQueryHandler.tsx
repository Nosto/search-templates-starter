import { sizes, defaultConfig } from "@/config"
import { useActions, useSizeOptions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateURL } from "@/utils/url"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)

  // Get current query, pagination, and filter state from app
  const query = useNostoAppState(state => state.query?.query)
  const from = useNostoAppState(state => state.query?.products?.from)
  const filter = useNostoAppState(state => state.query?.products?.filter)

  // Initialize search from URL on first load
  useEffect(() => {
    const { query, page, filter } = getCurrentUrlState()
    if (query || page || filter) {
      const searchFrom = page ? (page - 1) * size : 0

      const searchConfig = {
        query: query || "",
        products: {
          size,
          from: searchFrom,
          filters: filter
        }
      }

      newSearch(searchConfig)
    }
  }, [newSearch, size])

  // Update URL when app state changes
  useEffect(() => {
    const currentPage = from ? Math.floor(from / size) + 1 : 1

    updateURL({
      query: query || undefined,
      page: currentPage > 1 ? currentPage : undefined,
      filter: filter
    })
  }, [query, from, size, filter])

  return null
}
