import { InputSearchTopLevelFilter } from "@nosto/nosto-js/client"

const QUERY_PARAM = "q"
const PAGE_PARAM = "p"
const FILTER_PREFIX = "filter."
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SORT_PARAM = "s" // Reserved for future simple sort parameter usage
const SORT_PREFIX = "sort."

type SimpleFilter = Pick<InputSearchTopLevelFilter, "field" | "value" | "range">

export interface UrlQueryState {
  query?: string
  page?: number
  filter?: SimpleFilter[]
  sort?: { field: string; order: string }[]
}

export function serializeQueryState(state: UrlQueryState) {
  const params = new URLSearchParams()

  if (state.query) {
    params.set(QUERY_PARAM, state.query)
  }

  if (state.page && state.page > 1) {
    params.set(PAGE_PARAM, state.page.toString())
  }

  if (state.filter && state.filter.length > 0) {
    state.filter.forEach(f => {
      if (f.field && f.value?.length) {
        f.value.forEach(val => params.append(`${FILTER_PREFIX}${f.field}`, val))
      }
    })
  }

  if (state.sort && state.sort.length > 0) {
    state.sort.forEach(s => {
      if (s.field && s.order) {
        params.set(`${SORT_PREFIX}${s.field}`, s.order)
      }
    })
  }

  return params
}

export function deserializeQueryState(searchParams: URLSearchParams) {
  const state: UrlQueryState = {}

  const q = searchParams.get(QUERY_PARAM)
  if (q) {
    state.query = q
  }

  const p = searchParams.get(PAGE_PARAM)
  if (p) {
    const pageNum = parseInt(p, 10)
    if (!isNaN(pageNum) && pageNum > 1) {
      state.page = pageNum
    }
  }

  const filters: InputSearchTopLevelFilter[] = []
  const filterMap = new Map<string, string[]>()

  const sorts: { field: string; order: string }[] = []

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith(FILTER_PREFIX) && value.trim()) {
      const field = key.substring(FILTER_PREFIX.length)
      if (!filterMap.has(field)) {
        filterMap.set(field, [])
      }
      filterMap.get(field)!.push(value.trim())
    } else if (key.startsWith(SORT_PREFIX) && value.trim()) {
      const field = key.substring(SORT_PREFIX.length)
      sorts.push({ field, order: value.trim() })
    }
  }

  for (const [field, value] of filterMap.entries()) {
    filters.push({ field, value })
  }

  if (filters.length > 0) {
    state.filter = filters
  }

  if (sorts.length > 0) {
    state.sort = sorts
  }

  return state
}

export function updateURL(state: UrlQueryState) {
  const params = serializeQueryState(state)
  const url = new URL(window.location.pathname, window.location.origin)
  url.search = params.toString()

  window.history.replaceState(null, "", url.pathname + url.search)
}

export function getCurrentUrlState() {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}
