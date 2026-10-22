import type { API } from "@nosto/nosto-js/client"
import { getSessionStorageItem, setSessionStorageItem } from "@nosto/search-js/utils"

export const failureModes = ["off", "error", "timeout"] as const

type FailureMode = (typeof failureModes)[number]

type SearchFn = API["search"]

const storageKey = "nosto:search-js:dev:simulate-failure"
const timeoutMs = 5000

export function parseFailureMode(value: unknown) {
  return failureModes.find(mode => mode === value)
}

/**
 * Resolves the simulated failure mode from sessionStorage, so the mode survives template navigation and reloads.
 */
export function getFailureMode(): FailureMode {
  return parseFailureMode(getSessionStorageItem(storageKey)) ?? "off"
}

export function setFailureMode(mode: FailureMode) {
  setSessionStorageItem(storageKey, mode)
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Wraps the search function so that it behaves as if the Nosto search service failed.
 */
export function withSimulatedFailure(search: SearchFn): SearchFn {
  return async (query, options) => {
    switch (getFailureMode()) {
      case "error":
        throw Object.assign(new Error("[Dev] Simulated Nosto search failure"), { status: 503 })
      case "timeout":
        await delay(timeoutMs)
        throw new Error("[Dev] Simulated Nosto search timeout exceeded")
      default:
        return search(query, options)
    }
  }
}
