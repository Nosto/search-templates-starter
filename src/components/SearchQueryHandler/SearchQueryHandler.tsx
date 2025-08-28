import { sizes, defaultConfig } from "@/config"
import { useActions, useSizeOptions, useNostoAppState, useProductFilters } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateURL } from "@/utils/url"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)
  const { filters } = useProductFilters()

  // Get current query and pagination state from app
  const query = useNostoAppState(state => state.query?.query)
  const from = useNostoAppState(state => state.query?.products?.from)

  // Initialize search from URL on first load
  useEffect(() => {
    const { query, page, filter } = getCurrentUrlState()
    if (query || page || filter) {
      const searchFrom = page ? (page - 1) * size : 0

      const searchConfig: {
        query: string
        products: {
          size: number
          from: number
          filters?: Array<{ field: string; value: string }>
        }
      } = {
        query: query || "",
        products: {
          size,
          from: searchFrom
        }
      }

      // Add filters if they exist in URL
      if (filter && filter.length > 0) {
        searchConfig.products.filters = filter.map(f => ({
          field: f.field,
          value: f.value
        }))
      }

      newSearch(searchConfig)
    }
  }, [newSearch, size])

  // Update URL when app state changes
  useEffect(() => {
    const currentPage = from ? Math.floor(from / size) + 1 : 1

    // Convert current filters to URL format
    const currentFilters =
      filters.length > 0
        ? filters.map(f => ({ field: f?.name || "", value: f?.value || "" })).filter(f => f.field && f.value)
        : undefined

    updateURL({
      query: query || undefined,
      page: currentPage > 1 ? currentPage : undefined,
      filter: currentFilters
    })
  }, [query, from, size, filters])

  return null
}
