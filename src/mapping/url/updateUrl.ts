import { UrlQueryState } from "./types"
import { serializeQueryState } from "./serializeQueryState"

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

// Export getUrlFromState for use by other modules
export { getUrlFromState }
