import { useCallback, useRef } from "preact/hooks"

type DOMElementsMap = Record<string, HTMLElement | null>
type ElementSelectors = Record<string, string>

/**
 * Generic hook for lazily accessing DOM elements by selectors
 *
 * @example
 * ```typescript
 * // For required elements that must all be present
 * const { getElements } = useDOMElements({
 *   button: "#submit-btn",
 *   input: "#user-input"
 * })
 *
 * // For optional elements
 * const { getElements } = useDOMElements({
 *   modal: "#optional-modal",
 *   tooltip: ".tooltip"
 * }, { required: false })
 *
 * // Usage
 * const elements = getElements()
 * if (elements?.button) {
 *   elements.button.click()
 * }
 * ```
 */
export function useDOMElements<T extends DOMElementsMap>(
  selectors: ElementSelectors,
  options?: {
    warningMessage?: string
    required?: boolean
  }
) {
  const elementsRef = useRef<T | null>(null)
  const warningShownRef = useRef(false)
  const { warningMessage = "Required DOM elements not found", required = true } = options || {}

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

      if (!element && required) {
        allFound = false
      }
    }

    // If required elements are missing, show warning and return null
    if (!allFound && required) {
      if (!warningShownRef.current) {
        console.warn(warningMessage)
        warningShownRef.current = true
      }
      return null
    }

    elementsRef.current = elements
    return elementsRef.current
  }, [selectors, warningMessage, required])

  const clearCache = useCallback(() => {
    elementsRef.current = null
    warningShownRef.current = false
  }, [])

  return { getElements, clearCache }
}

// Specific autocomplete implementation using the generic hook
type AutocompleteDOMElements = {
  dropdownElement: HTMLElement | null
  searchInput: HTMLInputElement | null
  searchForm: HTMLFormElement | null
}

/**
 * Hook for lazily accessing autocomplete DOM elements
 * @deprecated Use useDOMElements directly for better flexibility
 */
export function useAutocompleteDOMElements() {
  const autocompleteSelectors = {
    dropdownElement: "#dropdown",
    searchInput: "#search",
    searchForm: "#search-form"
  }

  return useDOMElements<AutocompleteDOMElements>(autocompleteSelectors, {
    warningMessage: "Required DOM elements not found for autocomplete",
    required: true
  })
}
