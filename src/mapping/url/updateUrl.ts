import { SimpleQuery, UrlQueryState } from "./types"
import { getUrlFromState } from "./getUrlFromState"
import { toPageParameters } from "./toPageParameters"

export function updateUrl(state: UrlQueryState) {
  const url = getUrlFromState(state)
  window.history.replaceState(null, "", url)
}

export function updateUrlFromQuery({ from, size, query, filter, sort }: SimpleQuery) {
  updateUrl({
    ...toPageParameters(from, size),
    query,
    filter,
    sort
  })
}
