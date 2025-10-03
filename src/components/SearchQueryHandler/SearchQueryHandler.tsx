import { defaultConfig } from "@/config"
import { useNostoAppState } from "@nosto/search-js/preact/hooks"
import { updateUrl } from "@/mapping/url/updateUrl"

import { useEffect } from "preact/hooks"

export default function SearchQueryHandler() {
  // Get current query, pagination, filter, and sort state from app
  const { query, from, filter, size, sort } = useNostoAppState(state => ({
    query: state.query?.query,
    from: state.query?.products?.from,
    filter: state.query?.products?.filter,
    size: state.query?.products?.size ?? defaultConfig.serpSize,
    sort: state.query?.products?.sort
  }))

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
