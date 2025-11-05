import { useEffect } from "preact/hooks"
import { defaultSize } from "@/config"
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getQueryFromUrlState } from "@/mapping/url/getCurrentUrlState"
import { updateUrlFromQuery } from "@/mapping/url/updateUrl"

export default function SearchQueryHandler() {
  const { newSearch } = useActions()

  // Get current query, pagination, filter, and sort state from app
  const { query, from, filter, size, sort } = useNostoAppState(state => ({
    query: state.query?.query,
    from: state.query?.products?.from,
    filter: state.query?.products?.filter,
    size: state.query?.products?.size ?? defaultSize,
    sort: state.query?.products?.sort
  }))

  // Initialize search from URL on first load
  useEffect(() => {
    const query = getQueryFromUrlState()
    if (query) {
      newSearch(query)
    }
  }, [newSearch])

  // Update URL when app state changes
  useEffect(() => {
    updateUrlFromQuery({ from, size, query, filter, sort })
  }, [query, from, size, filter, sort])

  return null
}
