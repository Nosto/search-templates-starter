import { SearchQuery } from "@nosto/nosto-js/client"
import { deserializeQueryState } from "./deserializeQueryState"
import { defaultSize, infiniteScroll } from "@/config"

export function getCurrentUrlState() {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}

function fromPageParameters(urlSize: number | undefined, page: number | undefined) {
  const size = urlSize ?? defaultSize
  if (infiniteScroll) {
    return {
      from: 0,
      size: (page ?? 1) * size
    }
  }
  return {
    from: page ? (page - 1) * size : 0,
    size
  }
}

export function getQueryFromUrlState() {
  const { query, page, size: urlSize, filter, sort } = getCurrentUrlState()
  return {
    query,
    products: {
      ...fromPageParameters(urlSize, page),
      filter,
      sort
    }
  } satisfies SearchQuery
}
