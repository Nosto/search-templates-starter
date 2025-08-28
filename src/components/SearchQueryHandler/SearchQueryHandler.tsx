import { sizes, defaultConfig } from "@/config"
import { useActions, useSizeOptions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState, updateURL } from "@/utils/url"

import { useEffect, useRef } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)
  const initialized = useRef(false)

  // Get current query and pagination state from app
  const query = useNostoAppState(state => state.query?.query)
  const from = useNostoAppState(state => state.query?.products?.from)

  // Initialize search from URL on first load
  useEffect(() => {
    if (!initialized.current) {
      const { q, p } = getCurrentUrlState()
      if (q || p) {
        const searchFrom = p ? (p - 1) * size + 1 : 1
        newSearch({
          query: q || "",
          products: {
            size,
            from: searchFrom
          }
        })
      }
      initialized.current = true
    }
  }, [newSearch, size])

  // Update URL when app state changes
  useEffect(() => {
    if (initialized.current) {
      const currentPage = from ? Math.floor((from - 1) / size) + 1 : 1
      updateURL({
        q: query || undefined,
        p: currentPage > 1 ? currentPage : undefined
      })
    }
  }, [query, from, size])

  return null
}
