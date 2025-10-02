import { getCurrentUrlState } from "./getCurrentUrlState"
import { convertUrlStateToSearchConfig } from "./urlToSearchConfig"
import type { UrlQueryState } from "./types"
import type { SearchQuery } from "@nosto/nosto-js/client"

// Early URL state extraction - happens immediately on module load
let cachedUrlState: UrlQueryState | null = null
let cachedSearchConfig: SearchQuery | null = null

/**
 * Gets the initial URL state, cached on first call to avoid repeated parsing
 */
export function getEarlyUrlState(): UrlQueryState {
  if (cachedUrlState === null) {
    cachedUrlState = getCurrentUrlState()
  }
  return cachedUrlState
}

/**
 * Converts URL state to search configuration, cached on first call
 */
export function getEarlySearchConfig(): SearchQuery | null {
  if (cachedSearchConfig === null && cachedUrlState === null) {
    // Initialize both caches
    getEarlyUrlState()
  }

  if (cachedSearchConfig === null && cachedUrlState) {
    cachedSearchConfig = convertUrlStateToSearchConfig(cachedUrlState)
  }

  return cachedSearchConfig
}

/**
 * Checks if there's an initial search query in the URL
 */
export function hasInitialSearchQuery(): boolean {
  const urlState = getEarlyUrlState()
  return Boolean(urlState.query)
}

/**
 * Clears the cached state (useful for testing or when URL changes)
 */
export function clearEarlyStateCache(): void {
  cachedUrlState = null
  cachedSearchConfig = null
}

// Initialize URL state immediately on module load
getEarlyUrlState()
