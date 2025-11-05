import { SimpleQuery, UrlQueryState } from "./types"
import { getUrlFromState } from "./getUrlFromState"
import { defaultConfig, infiniteScroll } from "@/config"

export function updateUrl(state: UrlQueryState) {
  const url = getUrlFromState(state)
  window.history.replaceState(null, "", url)
}

function toPageParameters(from: number | undefined, size: number) {
  if (infiniteScroll) {
    return {
      page: Math.floor(size / defaultConfig.serpSize)
    }
  }
  return {
    page: from ? Math.floor(from / size) + 1 : 1,
    size
  }
}

export function updateUrlFromQuery({ from, size, query, filter, sort }: SimpleQuery) {
  updateUrl({
    ...toPageParameters(from, size),
    query,
    filter,
    sort
  })
}
