import { InputSearchTopLevelFilter, InputSearchSort } from "@nosto/nosto-js/client"

const QUERY_PARAM = "q"
const PAGE_PARAM = "p"
const FILTER_PREFIX = "filter."
const SORT_PARAM = "sort"

function encodeSortField(field: string) {
  return field.replace(/~/g, "%7E").replace(/,/g, "%2C")
}

function serializeSortToUrl(sort: InputSearchSort[]) {
  return sort.map(s => `${encodeSortField(s.field)}~${s.order}`).join(",")
}

function deserializeSortFromUrl(sortString: string) {
  if (!sortString.trim()) {
    return []
  }

  return sortString
    .split(",")
    .map(item => item.trim())
    .map(item => {
      const lastTildeIndex = item.lastIndexOf("~")
      if (lastTildeIndex === -1) return null
      const field = item.substring(0, lastTildeIndex).replace(/%7E/g, "~").replace(/%2C/g, ",")
      const order = item.substring(lastTildeIndex + 1)
      if (!field || !order) return null
      return { field, order } as InputSearchSort
    })
    .filter(item => item !== null)
}

type SimpleFilter = Pick<InputSearchTopLevelFilter, "field" | "value" | "range">

export interface UrlQueryState {
  query?: string
  page?: number
  filter?: SimpleFilter[]
  sort?: InputSearchSort[]
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
    params.set(SORT_PARAM, serializeSortToUrl(state.sort))
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

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith(FILTER_PREFIX) && value.trim()) {
      const field = key.substring(FILTER_PREFIX.length)
      if (!filterMap.has(field)) {
        filterMap.set(field, [])
      }
      filterMap.get(field)!.push(value.trim())
    }
  }

  for (const [field, value] of filterMap.entries()) {
    filters.push({ field, value })
  }

  if (filters.length > 0) {
    state.filter = filters
  }

  const sortParam = searchParams.get(SORT_PARAM)
  if (sortParam) {
    const sort = deserializeSortFromUrl(sortParam)
    if (sort.length > 0) {
      state.sort = sort
    }
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
