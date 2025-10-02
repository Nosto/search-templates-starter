import { useCallback, useRef } from "preact/hooks"

type DOMElementsMap = Record<string, HTMLElement | null>
type ElementSelectors = Record<string, string>

/**
 * Generic hook for lazily accessing DOM elements by selectors with timeout retry
 *
 * @example
 * ```typescript
 * const { getElements } = useDomElements({
 *   button: "#submit-btn",
 *   input: "#user-input"
 * })
 *
 * // Usage
 * const elements = getElements()
 * if (elements?.button) {
 *   elements.button.click()
 * }
 * ```
 */
export function useDomElements<T extends DOMElementsMap>(selectors: ElementSelectors) {
  const elementsRef = useRef<T | null>(null)
  const warningShownRef = useRef(false)
  const timeoutRef = useRef<number | null>(null)

  const getElements = useCallback((): T | null => {
    if (elementsRef.current) {
      return elementsRef.current
    }

    const elements = {} as T
    let allFound = true

    // Query all selectors
    for (const [key, selector] of Object.entries(selectors)) {
      const element = document.querySelector(selector) as HTMLElement | null
      elements[key as keyof T] = element as T[keyof T]

      if (!element) {
        allFound = false
      }
    }

    // If elements are missing, show warning and try again after timeout
    if (!allFound) {
      if (!warningShownRef.current) {
        console.warn("DOM elements not found, retrying...")
        warningShownRef.current = true

        // Retry after a short timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = window.setTimeout(() => {
          elementsRef.current = null
          warningShownRef.current = false
        }, 100)
      }
      return null
    }

    elementsRef.current = elements
    return elementsRef.current
  }, [selectors])

  const clearCache = useCallback(() => {
    elementsRef.current = null
    warningShownRef.current = false
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return { getElements, clearCache }
}
