import { InputSearchTopLevelFilter, InputSearchRangeFilter } from "@nosto/nosto-js/client"
import { ensureMapValue } from "@/utils/ensureMap"
import { UrlQueryState, QUERY_PARAM, PAGE_PARAM, SIZE_PARAM, FILTER_PREFIX, SORT_PARAM } from "./types"
import { deserializeSortFromUrl } from "./sort"

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

  const size = searchParams.get(SIZE_PARAM)
  if (size) {
    const sizeNum = parseInt(size, 10)
    if (!isNaN(sizeNum) && sizeNum > 0) {
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
