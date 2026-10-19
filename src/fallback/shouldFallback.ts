/**
 * Decides whether a search error means Nosto search is unavailable.
 *
 *  Request aborted                  -> no fallback
 *  status 200, 400 (Bad request)    -> no fallback
 *  status 403, 408, 5xx             -> fallback
 *  network error, timeout exceeded  -> fallback
 */
export function shouldFallback(error: unknown) {
  if (!error) {
    return false
  }
  if (String(error).includes("Request aborted")) {
    return false
  }
  if (typeof error === "object" && "name" in error && error.name === "AbortError") {
    return false
  }
  if (typeof error === "object" && "status" in error && typeof error.status === "number") {
    return ![200, 400].includes(error.status)
  }
  return true
}
