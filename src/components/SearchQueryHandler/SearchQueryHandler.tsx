import { useContext, useEffect } from "preact/hooks"
import { defaultConfig, skeletonLoading } from "@/config"
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getQueryFromUrlState } from "@/mapping/url/getCurrentUrlState"
import { updateUrlFromQuery } from "@/mapping/url/updateUrl"
import { StoreContext } from "@nosto/search-js/preact/common"
import { createSkeletonContent } from "./skeletonContent"

export default function SearchQueryHandler() {
  const store = useContext(StoreContext)
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
    const query = getQueryFromUrlState()
    if (query) {
      if (skeletonLoading) {
        // init store with skeleton content to avoid layout shift
        store.updateState(createSkeletonContent())
      }
      // execute initial query
      newSearch(query)
    }
  }, [store, newSearch])

  // Update URL when app state changes
  useEffect(() => {
    updateUrlFromQuery({ from, size, query, filter, sort })
  }, [query, from, size, filter, sort])

  return null
}
