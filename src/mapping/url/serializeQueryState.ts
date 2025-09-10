import { defaultConfig } from "@/config"
import { UrlQueryState } from "./types"
import { QUERY_PARAM, PAGE_PARAM, SIZE_PARAM, FILTER_PREFIX, SORT_PARAM } from "./constants"

function encodeSortField(field: string) {
  return field.replace(/~/g, "%7E").replace(/,/g, "%2C")
}

function serializeSortToUrl(sort: import("@nosto/nosto-js/client").InputSearchSort[]) {
  return sort.map(s => `${encodeSortField(s.field)}~${s.order}`).join(",")
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

  if (state.size && state.size !== defaultConfig.serpSize) {
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
