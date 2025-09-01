import { sizes, defaultConfig } from "@/config"
import { useActions, useSizeOptions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateURL } from "@/utils/url"
import type { InputSearchSort } from "@nosto/nosto-js/client"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)

  // Get current query, pagination, filter, and sort state from app
  const query = useNostoAppState(state => state.query?.query)
  const from = useNostoAppState(state => state.query?.products?.from)
  const filter = useNostoAppState(state => state.query?.products?.filter)
  const sort = useNostoAppState(state => state.query?.products?.sort)

  // Initialize search from URL on first load
  useEffect(() => {
    const { query, page, filter, sort } = getCurrentUrlState()
    if (query || page || filter || sort) {
      const searchFrom = page ? (page - 1) * size : 0

      // Convert URL sort format to InputSearchSort format
      const searchSort: InputSearchSort[] | undefined = sort?.map(s => ({
        field: s.field,
        order: s.order as "asc" | "desc"
      }))

      const searchConfig = {
        query: query || "",
        products: {
          size,
          from: searchFrom,
          filter,
          sort: searchSort
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
      filter,
      sort
    })
  }, [query, from, size, filter, sort])

  return null
}
