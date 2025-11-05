import { SearchQuery } from "@nosto/nosto-js/client"
import { deserializeQueryState } from "./deserializeQueryState"
import { fromPageParameters } from "./fromPageParameters"

export function getCurrentUrlState() {
  const searchParams = new URLSearchParams(window.location.search)
  return deserializeQueryState(searchParams)
}

export function getQueryFromUrlState() {
  const { query, page, size: urlSize, filter, sort } = getCurrentUrlState()
  if (query) {
    return {
      query,
      products: {
        ...fromPageParameters(urlSize, page),
        filter,
        sort
      }
    } satisfies SearchQuery
  }
  return undefined
}
