import { InputSearchTopLevelFilter } from "@nosto/nosto-js/client"

const QUERY_PARAM = "q"
const PAGE_PARAM = "p"
const FILTER_PREFIX = "filter."

type SimpleFilter = Pick<InputSearchTopLevelFilter, "field" | "value" | "range">

export interface UrlQueryState {
  query?: string
  page?: number
  filter?: SimpleFilter[]
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

  return state
}

export function createUrlFromState(state: UrlQueryState): string {
  const params = serializeQueryState(state)
  const url = new URL(window.location.pathname, window.location.origin)
  url.search = params.toString()

  return url.pathname + url.search
}

export function updateURL(state: UrlQueryState) {
  const url = createUrlFromState(state)
  window.history.replaceState(null, "", url)
}

export function getCurrentUrlState() {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}

export function generatePageUrl(page: number): string {
  const currentState = getCurrentUrlState()
  const newState = {
    ...currentState,
    page: page > 1 ? page : undefined
  }

  return createUrlFromState(newState)
}
