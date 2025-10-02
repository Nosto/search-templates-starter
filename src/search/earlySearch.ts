import { nostojs } from "@nosto/nosto-js"
import type { SearchQuery, SearchResult } from "@nosto/nosto-js/client"
import { getEarlyUrlState, shouldExecuteEarlySearch } from "@/mapping/url/getEarlyUrlState"
import { defaultConfig } from "@/config"
import { tagging } from "@/mapping/tagging"

// Track early search execution to avoid duplicate searches
let earlySearchExecuted = false
let earlySearchPromise: Promise<SearchResult> | null = null

// Pre-initialize search configuration from URL
function createSearchConfigFromUrl(): SearchQuery | null {
  const urlState = getEarlyUrlState()

  // Return null if no search-worthy parameters are found
  if (!urlState.query && !urlState.filter && !urlState.page && !urlState.sort) {
    return null
  }

  const size = urlState.size ?? defaultConfig.serpSize
  const from = urlState.page ? (urlState.page - 1) * size : 0

  const searchConfig: SearchQuery = {
    query: urlState.query || "",
    products: {
      size,
      from,
      filter: urlState.filter,
      sort: urlState.sort
    }
  }

  return searchConfig
}

// Enhanced search config that includes category metadata when applicable
function createCategorySearchConfig(): SearchQuery | null {
  const baseConfig = createSearchConfigFromUrl()
  if (!baseConfig) return null

  try {
    // Add category metadata if we're on a category page
    const pageType = tagging.pageType()
    if (pageType === "category") {
      return {
        ...baseConfig,
        products: {
          categoryId: tagging.categoryId(),
          categoryPath: tagging.categoryPath(),
          ...baseConfig.products
        }
      }
    }
  } catch {
    // Tagging API might not be ready yet, fall back to basic config
    console.debug("Tagging API not ready for early search, using basic config")
  }

  return baseConfig
}

// Execute early search as soon as Nosto SDK is ready
function executeEarlySearch(): Promise<SearchResult> | null {
  if (earlySearchExecuted || !shouldExecuteEarlySearch()) {
    return null
  }

  const searchConfig = createCategorySearchConfig()
  if (!searchConfig) {
    return null
  }

  earlySearchExecuted = true

  // Execute search immediately when Nosto is ready
  earlySearchPromise = new Promise((resolve, reject) => {
    nostojs(api => {
      try {
        console.debug("Executing early search with config:", searchConfig)
        // Use the search API directly to execute the search early
        const searchPromise = api.search(searchConfig)
        searchPromise.then(resolve).catch(reject)
      } catch (error) {
        console.warn("Early search execution failed:", error)
        reject(error)
      }
    })
  })

  return earlySearchPromise
}

// Public API
export function initEarlySearch(): Promise<SearchResult> | null {
  return executeEarlySearch()
}

export function isEarlySearchExecuted(): boolean {
  return earlySearchExecuted
}

export function getEarlySearchPromise(): Promise<SearchResult> | null {
  return earlySearchPromise
}

// Reset for testing purposes
export function resetEarlySearchState(): void {
  earlySearchExecuted = false
  earlySearchPromise = null
}
