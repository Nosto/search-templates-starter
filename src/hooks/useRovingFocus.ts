import { useCallback, useEffect, useRef, useState } from "preact/hooks"

export type RovingFocusConfig = {
  parentElement: HTMLElement
  focusableSelector: string
}

export type UseRovingFocusResult = {
  focusedIndex: number
  setFocusedIndex: (index: number) => void
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

  const updateTabIndices = useCallback(() => {
    const elements = getFocusableElements()
    elements.forEach((element, index) => {
      element.tabIndex = index === focusedIndex ? 0 : -1
    })
  }, [getFocusableElements, focusedIndex])

  const setupEventListeners = useCallback(() => {
    if (!configRef.current) return

    const parentElement = configRef.current.parentElement
    const handleParentKeyDown = (event: KeyboardEvent) => {
      // Only handle if the event target is a focusable element
      const elements = getFocusableElements()
      if (elements.includes(event.target as HTMLElement)) {
        handleKeyDown(event)
      }
    }

    parentElement.addEventListener("keydown", handleParentKeyDown)

    return () => {
      parentElement.removeEventListener("keydown", handleParentKeyDown)
    }
  }, [handleKeyDown, getFocusableElements])

  // Update tab indices whenever focused index changes or elements change
  useEffect(() => {
    updateTabIndices()
  }, [updateTabIndices])

  // Setup event listeners when config changes
  useEffect(() => {
    if (!configRef.current) return

    const cleanup = setupEventListeners()
    updateTabIndices()

    // Use MutationObserver to detect when elements are added/removed
    const observer = new MutationObserver(() => {
      updateTabIndices()
    })

    observer.observe(configRef.current.parentElement, {
      childList: true,
      subtree: true
    })

    return () => {
      cleanup?.()
      observer.disconnect()
    }
  }, [setupEventListeners, updateTabIndices])

  return {
    focusedIndex,
    setFocusedIndex,
    setConfig
  }
}
