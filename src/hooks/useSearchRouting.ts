import { useCallback, useEffect } from "preact/hooks"
import { useLocation } from "preact-iso"
import { useNostoAppState, usePagination } from "@nosto/search-js/preact/hooks"

export function useSearchRouting() {
  const location = useLocation()
  const { filter, sort } = useNostoAppState(state => ({
    filter: state.query.products?.filter,
    sort: state.query.products?.sort
  }))

  const { pages } = usePagination({ width: 5 })

  useEffect(() => {
    const url = new URL(window.location.href)

    const currentPage = pages.find(p => p.current)?.page || 1
    url.searchParams.set("page", currentPage.toString())
    url.searchParams.delete("filter")

    if (filter && filter.length) {
      let localFilter: string[] = []
      filter.forEach(({ field, value }) => {
        value?.forEach(v => {
          localFilter.push(`${field}:${v}`)
        })
      })
      url.searchParams.set("filter", localFilter.join(";"))
    }

    url.searchParams.delete("sort")
    if (sort?.length) {
      const sortParams: string[] = []
      sort.forEach(({ field, order }) => {
        sortParams.push(`${field}:${order}`)
      })
      url.searchParams.set("sort", sortParams.join(";"))
    }

    location.route(`${url.pathname}?${url.searchParams.toString()}`, true)
  }, [filter, sort, pages])

  return null
}
