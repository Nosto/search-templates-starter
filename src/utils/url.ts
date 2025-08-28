export interface Filter {
  field?: string
  value?: string | string[]
}

export interface UrlQueryState {
  query?: string
  page?: number
  filter?: Filter[]
}

export function serializeQueryState(state: UrlQueryState) {
  const params = new URLSearchParams()

  if (state.query) {
    params.set("q", state.query)
  }

  if (state.page && state.page > 1) {
    params.set("p", state.page.toString())
  }

  if (state.filter && state.filter.length > 0) {
    state.filter.forEach(f => {
      if (f.field && f.value !== undefined) {
        params.append(`filter.${f.field}`, Array.isArray(f.value) ? f.value.join(",") : String(f.value))
      }
    })
  }

  return params
}

export function deserializeQueryState(searchParams: URLSearchParams) {
  const state: UrlQueryState = {}

  const q = searchParams.get("q")
  if (q) {
    state.query = q
  }

  const p = searchParams.get("p")
  if (p) {
    const pageNum = parseInt(p, 10)
    if (!isNaN(pageNum) && pageNum > 1) {
      state.page = pageNum
    }
  }

  const filters: Filter[] = []

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("filter.") && value.trim()) {
      const field = key.substring(7) // Remove "filter." prefix
      filters.push({ field, value: value.trim() })
    }
  }

  if (filters.length > 0) {
    state.filter = filters
  }

  return state
}

export function updateURL(state: UrlQueryState) {
  const params = serializeQueryState(state)
  const url = new URL(window.location.pathname, window.location.origin || "http://localhost")
  url.search = params.toString()

  window.history.replaceState(null, "", url.pathname + url.search)
}

export function getCurrentUrlState() {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}
