import { InputSearchTopLevelFilter, InputSearchSort, InputSearchRangeFilter } from "@nosto/nosto-js/client"

const QUERY_PARAM = "q"
const PAGE_PARAM = "p"
const FILTER_PREFIX = "filter."
const SORT_PARAM = "sort"

function encodeSortField(field: string) {
  return field.replace(/~/g, "%7E").replace(/,/g, "%2C")
}

function decodeSortField(field: string) {
  return field.replace(/%7E/g, "~").replace(/%2C/g, ",")
}

function encodeValue(value: string) {
  // Don't encode anything - let URLSearchParams handle the encoding
  return value
}

function decodeValue(value: string) {
  // Don't decode anything - URLSearchParams already decodes values
  return value
}

function serializeRangeToUrl(ranges: InputSearchRangeFilter[]) {
  if (!ranges || ranges.length === 0) {
    return null
  }

  // For simplicity, we'll serialize the first range only
  // In practice, most use cases involve a single range per field
  const range = ranges[0]

  let left = ""
  let right = ""

  if (range.gt !== undefined) {
    left = `[${encodeValue(range.gt)}`
  } else if (range.gte !== undefined) {
    left = encodeValue(range.gte)
  }

  if (range.lt !== undefined) {
    right = `${encodeValue(range.lt)}]`
  } else if (range.lte !== undefined) {
    right = encodeValue(range.lte)
  }

  return `${left}~${right}`
}

function deserializeRangeFromUrl(rangeString: string): InputSearchRangeFilter | null {
  if (!rangeString.trim() || !rangeString.includes("~")) {
    return null
  }

  const parts = rangeString.split("~")
  if (parts.length !== 2) {
    return null
  }

  const [leftPart, rightPart] = parts
  const range: InputSearchRangeFilter = {}

  // Parse left side
  if (leftPart) {
    if (leftPart.startsWith("[")) {
      // gt (greater than, exclusive)
      range.gt = decodeValue(leftPart.substring(1))
    } else {
      // gte (greater than or equal, inclusive)
      range.gte = decodeValue(leftPart)
    }
  }

  // Parse right side
  if (rightPart) {
    if (rightPart.endsWith("]")) {
      // lt (less than, exclusive)
      range.lt = decodeValue(rightPart.substring(0, rightPart.length - 1))
    } else {
      // lte (less than or equal, inclusive)
      range.lte = decodeValue(rightPart)
    }
  }

  return range
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
      if (f.field && f.range?.length) {
        const rangeValue = serializeRangeToUrl(f.range)
        if (rangeValue) {
          params.append(`${FILTER_PREFIX}${f.field}`, rangeValue)
        }
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

  for (const [field, values] of filterMap.entries()) {
    // Check if any value contains a range pattern (contains ~)
    const rangeValues = values.filter(v => v.includes("~"))
    const regularValues = values.filter(v => !v.includes("~"))

    const filter: InputSearchTopLevelFilter = { field }

    // Process regular values
    if (regularValues.length > 0) {
      filter.value = regularValues
    }

    // Process range values
    if (rangeValues.length > 0) {
      // Try to parse the first range value
      const range = deserializeRangeFromUrl(rangeValues[0])
      if (range) {
        filter.range = [range]
      } else {
        // If range parsing failed, treat as regular values
        const allValues = [...(filter.value || []), ...rangeValues]
        filter.value = allValues
      }
    }

    // Only add filter if it has either value or range
    if (filter.value || filter.range) {
      filters.push(filter)
    }
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
  const params = serializeQueryState(state)
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
