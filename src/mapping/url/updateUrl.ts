import { SimpleQuery, UrlQueryState } from "./types"
import { getUrlFromState } from "./getUrlFromState"
import { defaultSize, infiniteScroll } from "@/config"

export function updateUrl(state: UrlQueryState) {
  const url = getUrlFromState(state)
  const absolute = new URL(url, window.location.href).toString()
  if (window.location.href === absolute) {
    return
  }
  window.history.pushState(null, "", url)
}

function toPageParameters(from: number | undefined, size: number) {
  if (infiniteScroll) {
    return {
      page: Math.floor(size / defaultSize)
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
