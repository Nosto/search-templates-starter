export interface UrlQueryState {
  q?: string
  p?: number
}

/**
 * Serializes query state into URL search parameters
 */
export function serializeQueryState(state: UrlQueryState): URLSearchParams {
  const params = new URLSearchParams()

  if (state.q) {
    params.set("q", state.q)
  }

  if (state.p && state.p > 1) {
    params.set("p", state.p.toString())
  }

  return params
}

/**
 * Deserializes URL search parameters into query state
 */
export function deserializeQueryState(searchParams: URLSearchParams): UrlQueryState {
  const state: UrlQueryState = {}

  const q = searchParams.get("q")
  if (q) {
    state.q = q
  }

  const p = searchParams.get("p")
  if (p) {
    const pageNum = parseInt(p, 10)
    if (!isNaN(pageNum) && pageNum > 1) {
      state.p = pageNum
    }
  }

  return state
}

/**
 * Updates the current URL with new query state without triggering navigation
 */
export function updateURL(state: UrlQueryState): void {
  const params = serializeQueryState(state)
  const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`

  window.history.replaceState(null, "", newUrl)
}

/**
 * Gets current query state from the URL
 */
export function getCurrentUrlState(): UrlQueryState {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}
