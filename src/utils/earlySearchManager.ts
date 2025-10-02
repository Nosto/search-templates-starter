import { getEarlySearchConfig, hasInitialSearchQuery } from "../mapping/url/earlyUrlState"
import type { SearchQuery } from "@nosto/nosto-js/client"

type SearchState = {
  isInitialized: boolean
  isSearchInProgress: boolean
  hasTriggeredInitialSearch: boolean
  pendingSearchConfig: SearchQuery | null
}

// Global search state manager
const searchState: SearchState = {
  isInitialized: false,
  isSearchInProgress: false,
  hasTriggeredInitialSearch: false,
  pendingSearchConfig: null
}

// Callbacks for when search state changes
type SearchStateListener = (config: SearchQuery) => void
const searchListeners: SearchStateListener[] = []

/**
 * Initializes the early search system after Nosto SDK is ready
 */
export function initializeEarlySearch(): void {
  if (searchState.isInitialized) {
    return
  }

  searchState.isInitialized = true

  // Check if we have an initial search query from URL
  if (hasInitialSearchQuery() && !searchState.hasTriggeredInitialSearch) {
    const searchConfig = getEarlySearchConfig()
    if (searchConfig) {
      triggerEarlySearch(searchConfig)
    }
  }
}

/**
 * Triggers a search before components are ready
 */
function triggerEarlySearch(searchConfig: SearchQuery): void {
  if (searchState.hasTriggeredInitialSearch) {
    return
  }

  searchState.hasTriggeredInitialSearch = true
  searchState.isSearchInProgress = true
  searchState.pendingSearchConfig = searchConfig

  // Notify any registered listeners
  searchListeners.forEach(listener => {
    try {
      listener(searchConfig)
    } catch (error) {
      console.warn("Error in search state listener:", error)
    }
  })
}

/**
 * Registers a listener for when early search is triggered
 */
export function onEarlySearchTriggered(listener: SearchStateListener): () => void {
  searchListeners.push(listener)

  // If search was already triggered, call immediately
  if (searchState.hasTriggeredInitialSearch && searchState.pendingSearchConfig) {
    try {
      listener(searchState.pendingSearchConfig)
    } catch (error) {
      console.warn("Error in search state listener:", error)
    }
  }

  // Return unsubscribe function
  return () => {
    const index = searchListeners.indexOf(listener)
    if (index > -1) {
      searchListeners.splice(index, 1)
    }
  }
}

/**
 * Marks the search as completed
 */
export function markSearchCompleted(): void {
  searchState.isSearchInProgress = false
}

/**
 * Checks if the initial search has been triggered
 */
export function hasTriggeredInitialSearch(): boolean {
  return searchState.hasTriggeredInitialSearch
}

/**
 * Gets the pending search configuration if available
 */
export function getPendingSearchConfig(): SearchQuery | null {
  return searchState.pendingSearchConfig
}

/**
 * Checks if a search is currently in progress
 */
export function isSearchInProgress(): boolean {
  return searchState.isSearchInProgress
}

/**
 * Resets the search state (useful for testing)
 */
export function resetEarlySearchState(): void {
  searchState.isInitialized = false
  searchState.isSearchInProgress = false
  searchState.hasTriggeredInitialSearch = false
  searchState.pendingSearchConfig = null
  searchListeners.length = 0
}
