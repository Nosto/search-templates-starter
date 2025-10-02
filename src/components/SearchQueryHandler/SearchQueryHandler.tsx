import { defaultConfig } from "@/config"
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getCurrentUrlState } from "@/mapping/url/getCurrentUrlState"
import { updateUrl } from "@/mapping/url/updateUrl"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()

  // Get current query, pagination, filter, and sort state from app
  const { query, from, filter, size, sort } = useNostoAppState(state => ({
    query: state.query?.query,
    from: state.query?.products?.from,
    filter: state.query?.products?.filter,
    size: state.query?.products?.size ?? defaultConfig.serpSize,
    sort: state.query?.products?.sort
  }))

  // Initialize search from URL on first load
  useEffect(() => {
    const { query, page, size: urlSize, filter, sort } = getCurrentUrlState()
    if (query) {
      const size = urlSize ?? defaultConfig.serpSize
      const from = page ? (page - 1) * size : 0

      const searchConfig = {
        query,
        products: {
          size,
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
