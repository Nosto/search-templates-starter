import { useCallback, useEffect, useState } from "preact/hooks"

const keyToDirection: Record<string, "back" | "front"> = {
  ArrowDown: "front",
  ArrowUp: "back",
  ArrowLeft: "back",
  ArrowRight: "front"
}

export function useRovingFocus(
  parentElementRef: { current: HTMLElement | null },
  selector: string = ".ns-autocomplete-element"
) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null)

  // Resolve ref value inside effect
  useEffect(() => {
    setParentElement(parentElementRef.current)
  }, [parentElementRef])

  const getFocusableElements = useCallback(() => {
    if (!parentElement) return []
    const elements = parentElement.querySelectorAll(selector)
    return Array.from(elements) as HTMLElement[]
  }, [parentElement, selector])

  const getCurrentFocusedIndex = useCallback(() => {
    const elements = getFocusableElements()
    const activeElement = document.activeElement as HTMLElement
    const index = elements.findIndex(el => el === activeElement)
    return index >= 0 ? index : focusedIndex
  }, [getFocusableElements, focusedIndex])

  const moveFocus = useCallback(
    (direction: "back" | "front") => {
      const elements = getFocusableElements()
      if (elements.length === 0) return

      const currentIndex = getCurrentFocusedIndex()
      let newIndex = currentIndex

      if (direction === "back") {
        newIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1
      } else if (direction === "front") {
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
    if (!parentElement) return

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
  }, [parentElement, handleKeyDown, getFocusableElements])

  // Update tab indices whenever focused index changes or elements change
  useEffect(() => {
    updateTabIndices()
  }, [updateTabIndices])

  // Setup event listeners when parent element changes
  useEffect(() => {
    if (!parentElement) return

    const cleanup = setupEventListeners()
    updateTabIndices()

    // Use MutationObserver to detect when elements are added/removed
    const observer = new MutationObserver(() => {
      updateTabIndices()
    })

    observer.observe(parentElement, {
      childList: true,
      subtree: true
    })

    return () => {
      cleanup?.()
      observer.disconnect()
    }
  }, [parentElement, setupEventListeners, updateTabIndices])
}
