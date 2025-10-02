import { deserializeQueryState } from "./deserializeQueryState"
import type { UrlQueryState } from "./types"

// Extract URL state at module load time for early search execution
let earlyUrlState: UrlQueryState | null = null

// Only parse URL state if we're in a browser environment
if (typeof window !== "undefined") {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    earlyUrlState = deserializeQueryState(searchParams)
  } catch (error) {
    console.warn("Failed to parse early URL state:", error)
    earlyUrlState = {}
  }
}

export function getEarlyUrlState(): UrlQueryState {
  return earlyUrlState || {}
}

// Check if there's a search query or category context that should trigger early search
export function shouldExecuteEarlySearch(): boolean {
  const state = getEarlyUrlState()
  return !!(state.query || state.filter || state.page || state.sort)
}
