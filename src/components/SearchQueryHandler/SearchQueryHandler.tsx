import { useContext, useEffect } from "preact/hooks"
import { defaultSize, skeletonLoading } from "@/config"
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { getQueryFromUrlState, getCurrentUrlState } from "@/mapping/url/getCurrentUrlState"
import { updateUrlFromQuery } from "@/mapping/url/updateUrl"
import { StoreContext } from "@nosto/search-js/preact/common"
import { createSkeletonContent } from "./skeletonContent"

type SearchQueryHandlerProps = {
  pageType: "search" | "category"
}

export default function SearchQueryHandler({ pageType }: SearchQueryHandlerProps) {
  const store = useContext(StoreContext)
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
    const urlQuery = getQueryFromUrlState()

    // For search pages, only fire if there's a query in the URL
    // For category pages, always fire an initial empty request
    if (pageType === "search" && urlQuery) {
      if (skeletonLoading) {
        // init store with skeleton content to avoid layout shift
        store.updateState(createSkeletonContent(urlQuery))
      }
      // execute initial query
      newSearch(urlQuery)
    } else if (pageType === "category") {
      // For category pages, create a query with URL params (filter, sort, pagination) if available
      const urlState = getCurrentUrlState()
      const categoryQuery = {
        products: {
          filter: urlState.filter,
          sort: urlState.sort,
          from: urlState.page ? (urlState.page - 1) * (urlState.size ?? defaultSize) : 0,
          size: urlState.size ?? defaultSize
        }
      }
      if (skeletonLoading) {
        // init store with skeleton content to avoid layout shift
        store.updateState(createSkeletonContent(categoryQuery))
      }
      // execute initial request (category metadata will be added by config)
      newSearch(categoryQuery)
    }
  }, [store, newSearch, pageType])

  // Update URL when app state changes (only for search pages)
  useEffect(() => {
    if (pageType === "search") {
      updateUrlFromQuery({ from, size, query, filter, sort })
    } else if (pageType === "category") {
      // For category pages, update URL with filters/sort/pagination but no query
      updateUrlFromQuery({ from, size, query: undefined, filter, sort })
    }
  }, [query, from, size, filter, sort, pageType])

  return null
}
