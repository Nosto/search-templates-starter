import { sizes, defaultConfig, sortOptions } from "@/config"
import { useActions, useSizeOptions, useNostoAppState, useSort } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateURL } from "@/utils/url"
import { findSortOptionId } from "@/utils/sorting"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)
  const { setSort } = useSort(sortOptions)

  // Get current query, pagination, filter, and sort state from app
  const query = useNostoAppState(state => state.query?.query)
  const from = useNostoAppState(state => state.query?.products?.from)
  const filter = useNostoAppState(state => state.query?.products?.filter)
  const sort = useNostoAppState(state => state.query?.products?.sort)

  // Initialize search from URL on first load
  useEffect(() => {
    const { query, page, filter, sort: urlSort } = getCurrentUrlState()
    if (query || page || filter || urlSort) {
      const searchFrom = page ? (page - 1) * size : 0

      const searchConfig = {
        query: query || "",
        products: {
          size,
          from: searchFrom,
          filter,
          sort: urlSort
        }
      }

      newSearch(searchConfig)

      // Update sort dropdown if URL contains sort
      if (urlSort) {
        const sortOptionId = findSortOptionId(urlSort, sortOptions)
        if (sortOptionId) {
          setSort(sortOptionId)
        }
      }
    }
  }, [newSearch, size, setSort])

  // Update URL when app state changes
  useEffect(() => {
    const currentPage = from ? Math.floor(from / size) + 1 : 1

    updateURL({
      query: query || undefined,
      page: currentPage > 1 ? currentPage : undefined,
      filter,
      sort
    })
  }, [query, from, size, filter, sort])

  return null
}
