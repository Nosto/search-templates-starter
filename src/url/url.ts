import type { InputSearchSort } from "@nosto/nosto-js/client"
import { serializeFilters, deserializeFilters, FILTER_PREFIX } from "./filter"
import type { SimpleFilter } from "./filter"
import { serializeSort, deserializeSort, SORT_PARAM } from "./sort"
import { serializePage, deserializePage, PAGE_PARAM } from "./page"
import { serializeSize, deserializeSize, SIZE_PARAM } from "./size"
import { serializeQuery, deserializeQuery, QUERY_PARAM } from "./query"

export interface UrlQueryState {
  query?: string
  page?: number
  size?: number
  filter?: SimpleFilter[]
  sort?: InputSearchSort[]
}

function clearMappedParameters(params: URLSearchParams) {
  const keysToDelete = [
    QUERY_PARAM,
    PAGE_PARAM,
    SIZE_PARAM,
    SORT_PARAM,
    ...Array.from(params.keys()).filter(key => key.startsWith(FILTER_PREFIX))
  ]
  keysToDelete.forEach(key => params.delete(key))
}

function assignIfTruthy<K extends keyof UrlQueryState>(
  target: UrlQueryState,
  key: K,
  value: UrlQueryState[K] | undefined
) {
  if (value) {
    target[key] = value
  }
}

export function serializeQueryState(state: UrlQueryState, params: URLSearchParams) {
  clearMappedParameters(params)

  serializeQuery(state.query, params)
  serializePage(state.page, params)
  serializeSize(state.size, params)
  serializeFilters(state.filter || [], params)
  serializeSort(state.sort || [], params)

  return params
}

export function deserializeQueryState(searchParams: URLSearchParams) {
  const state: UrlQueryState = {}

  assignIfTruthy(state, "query", deserializeQuery(searchParams))
  assignIfTruthy(state, "page", deserializePage(searchParams))
  assignIfTruthy(state, "size", deserializeSize(searchParams))
  assignIfTruthy(state, "filter", deserializeFilters(searchParams))
  assignIfTruthy(state, "sort", deserializeSort(searchParams))

  return state
}

export function getUrlFromState(state: UrlQueryState) {
  const params = new URLSearchParams(window.location.search || "")
  serializeQueryState(state, params)

  const url = new URL(window.location.pathname, window.location.origin)
  url.search = params.toString()

  return url.pathname + url.search
}

export function updateUrl(state: UrlQueryState) {
  const url = getUrlFromState(state)
  window.history.replaceState(null, "", url)
}

export function getCurrentUrlState() {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}
