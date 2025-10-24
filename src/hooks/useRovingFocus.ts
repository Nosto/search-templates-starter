import { useCallback, useRef } from "preact/hooks"

const keyToDirection: Record<string, "back" | "front"> = {
  ArrowDown: "front",
  ArrowUp: "back",
  ArrowLeft: "back",
  ArrowRight: "front"
}

type Cleanup = () => void

export function useRovingFocus<T extends HTMLElement>(selector: string) {
  const cleanup = useRef<Cleanup>()

  const setRef = useCallback(
    (parentElement: T | null) => {
      if (cleanup.current) {
        cleanup.current()
        cleanup.current = undefined
      }
      if (!parentElement) return

      let focusedIndex = 0
      let focusableElements: HTMLElement[] = []

      const getCurrentFocusedIndex = () => {
        const activeElement = document.activeElement as HTMLElement
        const index = focusableElements.findIndex(el => el === activeElement)
        return index >= 0 ? index : focusedIndex
      }

      const moveFocus = (direction: "back" | "front") => {
        if (focusableElements.length === 0) return
        const currentIndex = getCurrentFocusedIndex()
        let newIndex = currentIndex

        if (direction === "back") {
          newIndex = currentIndex === 0 ? currentIndex : currentIndex - 1
        } else if (direction === "front") {
          newIndex = currentIndex === focusableElements.length - 1 ? currentIndex : currentIndex + 1
        }

        if (newIndex !== currentIndex) {
          focusedIndex = newIndex
          focusableElements[currentIndex].tabIndex = -1
          focusableElements[newIndex].tabIndex = 0
          focusableElements[newIndex].focus()
        }
      }

      const handleKeyDown = (event: KeyboardEvent) => {
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
      }

      // Update focusable elements
      const updateFocusableElements = () => {
        const elements = parentElement?.querySelectorAll(selector)
        focusableElements = Array.from(elements ?? []) as HTMLElement[]
      }
      updateFocusableElements()

      // Update tab indices
      const updateTabIndices = () => {
        focusableElements.forEach((element, index) => {
          element.tabIndex = index === focusedIndex ? 0 : -1
        })
      }
      updateTabIndices()

      // Setup event listeners
      const handleParentKeyDown = (event: KeyboardEvent) => {
        if (focusableElements.includes(event.target as HTMLElement)) {
          handleKeyDown(event)
        }
      }
      parentElement.addEventListener("keydown", handleParentKeyDown)

      // Setup mutation observer
      const observer = new MutationObserver(() => {
        updateFocusableElements()
        updateTabIndices()
      })

      observer.observe(parentElement, {
        childList: true,
        subtree: true
      })

      cleanup.current = () => {
        parentElement.removeEventListener("keydown", handleParentKeyDown)
        observer.disconnect()
      }
    },
    [selector]
  )

  return setRef
}
