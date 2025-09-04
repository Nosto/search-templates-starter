import { InputSearchTopLevelFilter, InputSearchSort, InputSearchRangeFilter } from "@nosto/nosto-js/client"
import { ensureMapValue } from "./ensureMap"

const QUERY_PARAM = "q"
const PAGE_PARAM = "p"
const FILTER_PREFIX = "filter."
const SORT_PARAM = "sort"
const SIZE_PARAM = "size"

function encodeSortField(field: string) {
  return field.replace(/~/g, "%7E").replace(/,/g, "%2C")
}

function decodeSortField(field: string) {
  return field.replace(/%7E/g, "~").replace(/%2C/g, ",")
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
      const parts = item.split("~")
      if (parts.length !== 2) return null
      const field = decodeSortField(parts[0])
      const order = parts[1]
      if (!field || !order) return null
      return { field, order } as InputSearchSort
    })
    .filter(item => item !== null)
}

type SimpleFilter = Pick<InputSearchTopLevelFilter, "field" | "value" | "range">

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

  if (state.page && state.page > 1) {
    params.set(PAGE_PARAM, state.page.toString())
  }

  if (state.size) {
    params.set(SIZE_PARAM, state.size.toString())
  }

  if (state.filter && state.filter.length > 0) {
    state.filter.forEach(filter => {
      const { field, value, range } = filter
      if (!field) {
        return
      }

      if (value?.length) {
        value.forEach(val => params.append(`${FILTER_PREFIX}${field}`, val))
      }
      if (range?.length) {
        range.forEach(rangeFilter => {
          Object.entries(rangeFilter).forEach(([rangeKey, rangeValue]) => {
            if (rangeValue) {
              params.set(`${FILTER_PREFIX}${field}.${rangeKey}`, rangeValue)
            }
          })
        })
      }
    })
  }

  if (state.sort && state.sort.length > 0) {
    params.set(SORT_PARAM, serializeSortToUrl(state.sort))
  }

  return params
}

/**
 * Parse a string as a positive int > minValue, return undefined if invalid
 */
function parsePositiveInt(value: string, minValue: number): number | undefined {
  const parsedNum = parseInt(value, 10)
  if (!isNaN(parsedNum) && parsedNum > minValue) {
    return parsedNum
  }
  return undefined
}

export function deserializeQueryState(searchParams: URLSearchParams) {
  const state: UrlQueryState = {}

  const q = searchParams.get(QUERY_PARAM)
  if (q) {
    state.query = q
  }

  const pageParamValue = searchParams.get(PAGE_PARAM)
  if (pageParamValue) {
    const pageNum = parsePositiveInt(pageParamValue, 1)
    if (pageNum) {
      state.page = pageNum
    }
  }

  const sizeParamValue = searchParams.get(SIZE_PARAM)
  if (sizeParamValue) {
    const sizeNum = parsePositiveInt(sizeParamValue, 0)
    if (sizeNum) {
      state.size = sizeNum
    }
  }

  const filters: InputSearchTopLevelFilter[] = []
  const filterMap = new Map<string, string[]>()
  const rangeMap = new Map<string, InputSearchRangeFilter>()

  for (const [key, value] of searchParams.entries()) {
    const trimmedValue = value.trim()
    if (!key.startsWith(FILTER_PREFIX) || !trimmedValue) {
      continue
    }

    const filterKey = key.substring(FILTER_PREFIX.length)

    // Check if this is a range filter (has .gt, .gte, .lt, .lte suffix)
    const rangeMatch = filterKey.match(/^(.+)\.(gt|gte|lt|lte)$/)
    if (rangeMatch) {
      const [, field, rangeType] = rangeMatch
      const rangeObj = ensureMapValue(rangeMap, field, {})
      rangeObj[rangeType as keyof InputSearchRangeFilter] = trimmedValue
    } else {
      // Regular value filter
      ensureMapValue(filterMap, filterKey, []).push(trimmedValue)
    }
  }

  // Add value filters
  for (const [field, value] of filterMap.entries()) {
    filters.push({ field, value })
  }

  // Add range filters
  for (const [field, range] of rangeMap.entries()) {
    filters.push({ field, range: [range] })
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
