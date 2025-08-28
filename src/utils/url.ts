export interface UrlQueryState {
  query?: string
  page?: number
  filter?: Array<{ field: string; value: string }>
}

export function serializeQueryState(state: UrlQueryState): URLSearchParams {
  const params = new URLSearchParams()

  if (state.query) {
    params.set("q", state.query)
  }

  if (state.page && state.page > 1) {
    params.set("p", state.page.toString())
  }

  if (state.filter && state.filter.length > 0) {
    const filterString = state.filter.map(f => `${f.field}:${f.value}`).join(",")
    params.set("filter", filterString)
  }

  return params
}

export function deserializeQueryState(searchParams: URLSearchParams): UrlQueryState {
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

  const filter = searchParams.get("filter")
  if (filter) {
    const filterPairs = filter
      .split(",")
      .map(pair => {
        const [field, value = ""] = pair.split(":")
        return { field: field?.trim() || "", value: value?.trim() || "" }
      })
      .filter(pair => pair.field && pair.value)

    if (filterPairs.length > 0) {
      state.filter = filterPairs
    }
  }

  return state
}

export function updateURL(state: UrlQueryState): void {
  const params = serializeQueryState(state)
  const url = new URL(window.location.pathname, window.location.origin || "http://localhost")
  url.search = params.toString()

  window.history.replaceState(null, "", url.pathname + url.search)
}

export function getCurrentUrlState(): UrlQueryState {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}
