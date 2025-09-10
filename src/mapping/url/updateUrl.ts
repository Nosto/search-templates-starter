import { UrlQueryState } from "./types"
import { getUrlFromState } from "./getUrlFromState"

export function updateUrl(state: UrlQueryState) {
  const url = getUrlFromState(state)
  window.history.replaceState(null, "", url)
}
