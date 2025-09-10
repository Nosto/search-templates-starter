import type { InputSearchTopLevelFilter, InputSearchRangeFilter } from "@nosto/nosto-js/client"
import { ensureMapValue } from "@/utils/ensureMap"

export const FILTER_PREFIX = "filter."

export type SimpleFilter = Pick<InputSearchTopLevelFilter, "field" | "value" | "range">

export function serializeFilters(filters: SimpleFilter[], params: URLSearchParams) {
  if (filters && filters.length > 0) {
    filters.forEach(filter => {
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
}

export function deserializeFilters(searchParams: URLSearchParams): SimpleFilter[] | undefined {
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

  return filters.length > 0 ? filters : undefined
}

export function clearFilterParameters(params: URLSearchParams) {
  const keysToDelete = Array.from(params.keys()).filter(key => key.startsWith(FILTER_PREFIX))
  keysToDelete.forEach(key => params.delete(key))
}
