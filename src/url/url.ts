import { InputSearchSort } from "@nosto/nosto-js/client"
import { serializeFilters, deserializeFilters, SimpleFilter, FILTER_PREFIX } from "./filter"
import { serializeSort, deserializeSort, SORT_PARAM } from "./sort"
import { serializePage, deserializePage, PAGE_PARAM } from "./page"
import { serializeSize, deserializeSize, SIZE_PARAM } from "./size"

const QUERY_PARAM = "q"

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

export function serializeQueryState(state: UrlQueryState, params: URLSearchParams) {
  clearMappedParameters(params)

  if (state.query) {
    params.set(QUERY_PARAM, state.query)
  }

  serializePage(state.page, params)
  serializeSize(state.size, params)
  serializeFilters(state.filter || [], params)
  serializeSort(state.sort || [], params)

  return params
}

export function deserializeQueryState(searchParams: URLSearchParams) {
  const state: UrlQueryState = {}

  const q = searchParams.get(QUERY_PARAM)
  if (q) {
    state.query = q
  }

  const page = deserializePage(searchParams)
  if (page) {
    state.page = page
  }

  const size = deserializeSize(searchParams)
  if (size) {
    state.size = size
  }

  const filter = deserializeFilters(searchParams)
  if (filter) {
    state.filter = filter
  }

  const sort = deserializeSort(searchParams)
  if (sort) {
    state.sort = sort
  }

  return state
}

function getUrlFromState(state: UrlQueryState) {
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

export function getPageUrl(page: number) {
  const currentState = getCurrentUrlState()
  return getUrlFromState({
    ...currentState,
    page: page > 1 ? page : undefined
  })
}
