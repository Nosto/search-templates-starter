import { createContext } from "preact"
import { useContext, useState, useCallback, useEffect } from "preact/hooks"
import { ComponentChildren } from "preact"

type DropdownContextType = {
  highlightedIndex: number
  highlightNext: () => void
  highlightPrevious: () => void
  executeHighlighted: () => boolean
  resetHighlight: () => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

type DropdownProviderProps = {
  children: ComponentChildren
}

const SELECTOR = "[data-autocomplete-item]"

export function DropdownProvider({ children }: DropdownProviderProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const getElements = useCallback((): HTMLElement[] => {
    return Array.from(document.querySelectorAll(SELECTOR))
  }, [])

  const highlightNext = useCallback(() => {
    const elements = getElements()
    if (elements.length === 0) return

    setHighlightedIndex(prev => {
      const nextIndex = prev + 1
      return nextIndex >= elements.length ? elements.length - 1 : nextIndex
    })
  }, [getElements])

  const highlightPrevious = useCallback(() => {
    setHighlightedIndex(prev => Math.max(prev - 1, -1))
  }, [])

  const executeHighlighted = useCallback(() => {
    const elements = getElements()
    if (highlightedIndex >= 0 && highlightedIndex < elements.length) {
      elements[highlightedIndex]?.click()
      return true
    }
    return false
  }, [highlightedIndex, getElements])

  const resetHighlight = useCallback(() => {
    setHighlightedIndex(-1)
  }, [])

  useEffect(() => {
    const elements = getElements()
    elements.forEach((el, index) => {
      const isHighlighted = index === highlightedIndex
      el.classList.remove("ns-highlighted")
      if (isHighlighted) {
        el.classList.add("ns-highlighted")
        el.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    })
  }, [highlightedIndex, getElements])

  const contextValue = {
    highlightedIndex,
    highlightNext,
    highlightPrevious,
    executeHighlighted,
    resetHighlight
  }

  return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>
}

export function useDropdown() {
  const context = useContext(DropdownContext)
  if (context === undefined) {
    throw new Error("useDropdown must be used within a DropdownProvider")
  }
  return context
}
