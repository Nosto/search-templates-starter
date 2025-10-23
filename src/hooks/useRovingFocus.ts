import { useCallback, useRef, useState } from "preact/hooks"

export type RovingFocusConfig = {
  parentElement: HTMLElement
  focusableSelector: string
}

export type UseRovingFocusResult = {
  focusedIndex: number
  setFocusedIndex: (index: number) => void
  handleKeyDown: (event: KeyboardEvent) => void
  getTabIndex: (element: HTMLElement) => number
  setConfig: (config: RovingFocusConfig) => void
}

export function useRovingFocus(): UseRovingFocusResult {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const configRef = useRef<RovingFocusConfig | null>(null)

  const setConfig = useCallback((config: RovingFocusConfig) => {
    configRef.current = config
  }, [])

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!configRef.current) return []
    const elements = configRef.current.parentElement.querySelectorAll(configRef.current.focusableSelector)
    return Array.from(elements) as HTMLElement[]
  }, [])

  const getCurrentFocusedIndex = useCallback((): number => {
    const elements = getFocusableElements()
    const activeElement = document.activeElement as HTMLElement
    const index = elements.findIndex(el => el === activeElement)
    return index >= 0 ? index : focusedIndex
  }, [getFocusableElements, focusedIndex])

  const moveFocus = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      const elements = getFocusableElements()
      if (elements.length === 0) return

      const currentIndex = getCurrentFocusedIndex()
      let newIndex = currentIndex

      if (direction === "up" || direction === "left") {
        newIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1
      } else if (direction === "down" || direction === "right") {
        newIndex = currentIndex === elements.length - 1 ? 0 : currentIndex + 1
      }

      setFocusedIndex(newIndex)
      elements[newIndex]?.focus()
    },
    [getFocusableElements, getCurrentFocusedIndex]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const elements = getFocusableElements()
      if (elements.length === 0) return

      const keyToDirection: Record<string, "up" | "down" | "left" | "right"> = {
        ArrowDown: "down",
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowRight: "right"
      }

      const direction = keyToDirection[event.key]
      if (direction) {
        event.preventDefault()
        moveFocus(direction)
      } else if (event.key === "Enter") {
        event.preventDefault()
        const currentIndex = getCurrentFocusedIndex()
        elements[currentIndex]?.click()
      }
    },
    [moveFocus, getFocusableElements, getCurrentFocusedIndex]
  )

  const getTabIndex = useCallback(
    (element: HTMLElement) => {
      const elements = getFocusableElements()
      const index = elements.findIndex(el => el === element)
      return index === focusedIndex ? 0 : -1
    },
    [focusedIndex, getFocusableElements]
  )

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
    getTabIndex,
    setConfig
  }
}
