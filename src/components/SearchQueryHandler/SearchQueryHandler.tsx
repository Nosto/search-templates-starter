import { sizes, defaultConfig, sortOptions } from "@/config"
import { useActions, useSizeOptions, useNostoAppState, useSort } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateURL } from "@/utils/url"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)
  const { activeSort, setSort } = useSort(sortOptions)

  // Get current query, pagination, and filter state from app
  const query = useNostoAppState(state => state.query?.query)
  const from = useNostoAppState(state => state.query?.products?.from)
  const filter = useNostoAppState(state => state.query?.products?.filter)

  // Initialize search from URL on first load
  useEffect(() => {
    const { query, page, filter, sort } = getCurrentUrlState()
    if (query || page || filter || sort) {
      const searchFrom = page ? (page - 1) * size : 0

      // Find the sort option that matches the URL sort parameter
      const sortOption = sort ? sortOptions.find(option => option.id === sort) : undefined

      const searchConfig = {
        query: query || "",
        products: {
          size,
          from: searchFrom,
          filter,
          sort: sortOption?.value.sort
        }
      }

      newSearch(searchConfig)

      // Update the sort hook state if we found a matching sort option
      if (sortOption && sort && activeSort !== sort) {
        setSort(sort)
      }
    }
  }, [newSearch, size, activeSort, setSort])

  // Update URL when app state changes
  useEffect(() => {
    const currentPage = from ? Math.floor(from / size) + 1 : 1

    updateURL({
      query: query || undefined,
      page: currentPage > 1 ? currentPage : undefined,
      filter: filter,
      sort: activeSort !== defaultConfig.sort.id ? activeSort : undefined
    })
  }, [query, from, size, filter, activeSort])

  return null
}
