import { getSessionStorageItem, removeSessionStorageItem, setSessionStorageItem } from "@nosto/search-js/utils"

const key = "nosto:search-js:fallback"

/**
 * Marks the fallback as active for the given duration (ms)
 */
export function setFallbackSession(duration: number) {
  setSessionStorageItem(key, Date.now() + duration)
}

export function isFallbackActive() {
  const until = getSessionStorageItem<number>(key)
  return typeof until === "number" && Date.now() < until
}

export function getFallbackExpiry() {
  return getSessionStorageItem<number>(key)
}

export function clearFallbackSession() {
  removeSessionStorageItem(key)
}
