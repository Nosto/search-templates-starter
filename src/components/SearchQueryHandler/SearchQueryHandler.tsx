import { useContext, useEffect } from "preact/hooks"
import { config } from "@/config"
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getQueryFromUrlState } from "@/mapping/url/getCurrentUrlState"
import { updateUrlFromQuery } from "@/mapping/url/updateUrl"
import { StoreContext, useConfig } from "@nosto/search-js/preact/common"
import { createSkeletonContent } from "./skeletonContent"

export default function SearchQueryHandler() {
  const store = useContext(StoreContext)
  const { newSearch } = useActions()

  // Get current query, pagination, filter, and sort state from app
  const { query, from, filter, size, sort } = useNostoAppState(state => ({
    query: state.query?.query,
    from: state.query?.products?.from,
    filter: state.query?.products?.filter,
    size: state.query?.products?.size ?? config.defaultSize,
    sort: state.query?.products?.sort
  }))

  const { pageType } = useConfig()

  // Initialize search from URL on first load
  useEffect(() => {
    const query = getQueryFromUrlState()
    const isResultsPage = (pageType === "search" && query.query) || pageType === "category"
    if (isResultsPage) {
      if (config.skeletonLoading) {
        // init store with skeleton content to avoid layout shift
        store.updateState(createSkeletonContent(query))
      }
      // execute initial query
      newSearch(query)
    }
  }, [store, newSearch, pageType])

  // Update URL when app state changes
  useEffect(() => {
    updateUrlFromQuery({ from, size, query, filter, sort })
  }, [query, from, size, filter, sort])

  return null
}
