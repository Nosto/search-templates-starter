export interface UrlQueryState {
  q?: string
  p?: number
}

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
