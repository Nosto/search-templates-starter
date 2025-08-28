import { sizes, defaultConfig } from "@/config"
import { useParsedSearch } from "@/hooks/useParsedSearch"
import { InputSearchSort, InputSearchTopLevelFilter } from "@nosto/nosto-js/client"
import { useActions, useSizeOptions } from "@nosto/search-js/preact/hooks"
import { useLocation } from "preact-iso"

import { useEffect } from "preact/hooks"

function getLocation() {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get("q")
}

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)

  const { filters, sorting } = useParsedSearch()

  useEffect(() => {
    const searchQuery = getLocation()
    if (searchQuery) {
      newSearch({
        query: searchQuery,
        products: {
          size,
          filter: filters,
          sort: sorting
        }
      })
    }
  }, [newSearch, size])

  return null
}
