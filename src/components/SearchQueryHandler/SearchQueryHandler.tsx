import { sizes, defaultConfig } from "@/config"
import { useActions, useSizeOptions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateURL } from "@/utils/url"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)

  // Get current query and pagination state from app
  const query = useNostoAppState(state => state.query?.query)
  const from = useNostoAppState(state => state.query?.products?.from)

  // Initialize search from URL on first load
  useEffect(() => {
    const { query, page } = getCurrentUrlState()
    if (query || page) {
      const searchFrom = page ? (page - 1) * size : 0
      newSearch({
        query: query || "",
        products: {
          size,
          from: searchFrom
        }
      })
    }
  }, [newSearch, size])

  // Update URL when app state changes
  useEffect(() => {
    const currentPage = from ? Math.floor(from / size) + 1 : 1
    updateURL({
      query: query || undefined,
      page: currentPage > 1 ? currentPage : undefined
    })
  }, [query, from, size])

  return null
}
