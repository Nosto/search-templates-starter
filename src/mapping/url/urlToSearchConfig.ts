import { getCurrentUrlState } from "./getCurrentUrlState"
import { defaultConfig } from "@/config"
import type { UrlQueryState } from "./types"
import type { SearchQuery } from "@nosto/nosto-js/client"

/**
 * Converts URL query state to search configuration
 * This centralizes the conversion logic that was duplicated across components
 */
export function convertUrlStateToSearchConfig(urlState: UrlQueryState): SearchQuery | null {
  if (!urlState.query) {
    return null
  }

  const { query, page, size: urlSize, filter, sort } = urlState
  const size = urlSize ?? defaultConfig.serpSize
  const from = page ? (page - 1) * size : 0

  return {
    query,
    products: {
      size,
      from,
      filter,
      sort
    }
  }
}

/**
 * Gets the current URL state and converts it to search configuration
 */
export function getSearchConfigFromCurrentUrl(): SearchQuery | null {
  const urlState = getCurrentUrlState()
  return convertUrlStateToSearchConfig(urlState)
}
