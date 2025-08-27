import { sizes, defaultConfig } from "@/config"
import { useActions, useSizeOptions } from "@nosto/search-js/preact/hooks"

import { useEffect } from "preact/hooks"

function getLocation() {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get("q")
}

export default function SearchQueryHandler() {
  const { newSearch } = useActions()
  const { size } = useSizeOptions(sizes, defaultConfig.serpSize)

  useEffect(() => {
    const searchQuery = getLocation()
    if (searchQuery) {
      newSearch({
        query: searchQuery,
        products: {
          size
        }
      })
    }
  }, [newSearch, size])

  return null
}
