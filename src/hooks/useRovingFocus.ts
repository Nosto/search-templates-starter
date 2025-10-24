import { useCallback, useEffect, useState } from "preact/hooks"

const keyToDirection: Record<string, "back" | "front"> = {
  ArrowDown: "front",
  ArrowUp: "back",
  ArrowLeft: "back",
  ArrowRight: "front"
}

export function useRovingFocus(parentElement: HTMLElement | null, selector: string = ".ns-autocomplete-element") {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([])

  // Update focusable elements when parent or selector changes
  useEffect(() => {
    if (!parentElement) {
      setFocusableElements([])
      return
    }
    const elements = parentElement.querySelectorAll(selector)
    setFocusableElements(Array.from(elements) as HTMLElement[])
  }, [parentElement, selector])

  const getCurrentFocusedIndex = useCallback(() => {
    const activeElement = document.activeElement as HTMLElement
    const index = focusableElements.findIndex(el => el === activeElement)
    return index >= 0 ? index : focusedIndex
  }, [focusableElements, focusedIndex])

  const moveFocus = useCallback(
    (direction: "back" | "front") => {
      if (focusableElements.length === 0) return

      const currentIndex = getCurrentFocusedIndex()
      let newIndex = currentIndex

      if (direction === "back") {
        newIndex = currentIndex === 0 ? currentIndex : currentIndex - 1
      } else if (direction === "front") {
        newIndex = currentIndex === focusableElements.length - 1 ? currentIndex : currentIndex + 1
      }

      setFocusedIndex(newIndex)
      focusableElements[newIndex]?.focus()
    },
    [focusableElements, getCurrentFocusedIndex]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (focusableElements.length === 0) return

      const direction = keyToDirection[event.key]
      if (direction) {
        event.preventDefault()
        moveFocus(direction)
      } else if (event.key === "Enter") {
        event.preventDefault()
        const currentIndex = getCurrentFocusedIndex()
        focusableElements[currentIndex]?.click()
      }
    },
    [moveFocus, focusableElements, getCurrentFocusedIndex]
  )

  const updateTabIndices = useCallback(() => {
    focusableElements.forEach((element, index) => {
      element.tabIndex = index === focusedIndex ? 0 : -1
    })
  }, [focusableElements, focusedIndex])

  const setupEventListeners = useCallback(() => {
    if (!parentElement) return

    const handleParentKeyDown = (event: KeyboardEvent) => {
      // Only handle if the event target is a focusable element
      if (focusableElements.includes(event.target as HTMLElement)) {
        handleKeyDown(event)
      }
    }

    parentElement.addEventListener("keydown", handleParentKeyDown)

    return () => {
      parentElement.removeEventListener("keydown", handleParentKeyDown)
    }
  }, [parentElement, handleKeyDown, focusableElements])

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
      const newElements = Array.from(parentElement.querySelectorAll(selector)) as HTMLElement[]
      setFocusableElements(newElements)
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
