import { useCallback, useEffect, useRef, useState } from "preact/hooks"

export type RovingFocusItem = {
  id: string
  element: HTMLElement
  onSelect?: () => void
}

export type UseRovingFocusResult = {
  focusedIndex: number
  setFocusedIndex: (index: number) => void
  registerItem: (item: RovingFocusItem) => void
  unregisterItem: (id: string) => void
  handleKeyDown: (event: KeyboardEvent) => void
  getFocusProps: (
    id: string,
    index: number
  ) => {
    tabIndex: number
    ref: (el: HTMLElement | null) => void
    onKeyDown: (event: KeyboardEvent) => void
  }
}

export function useRovingFocus(): UseRovingFocusResult {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const itemsRef = useRef<RovingFocusItem[]>([])

  const registerItem = useCallback((item: RovingFocusItem) => {
    itemsRef.current = [...itemsRef.current, item]
  }, [])

  const unregisterItem = useCallback(
    (id: string) => {
      itemsRef.current = itemsRef.current.filter(item => item.id !== id)
      // Adjust focused index if needed
      if (focusedIndex >= itemsRef.current.length && itemsRef.current.length > 0) {
        setFocusedIndex(itemsRef.current.length - 1)
      }
    },
    [focusedIndex]
  )

  const moveFocus = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      const items = itemsRef.current
      if (items.length === 0) return

      let newIndex = focusedIndex

      if (direction === "up" || direction === "left") {
        newIndex = focusedIndex === 0 ? items.length - 1 : focusedIndex - 1
      } else if (direction === "down" || direction === "right") {
        newIndex = focusedIndex === items.length - 1 ? 0 : focusedIndex + 1
      }

      setFocusedIndex(newIndex)
      items[newIndex]?.element?.focus()
    },
    [focusedIndex]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const items = itemsRef.current
      if (items.length === 0) return

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          moveFocus("down")
          break
        case "ArrowUp":
          event.preventDefault()
          moveFocus("up")
          break
        case "ArrowLeft":
          event.preventDefault()
          moveFocus("left")
          break
        case "ArrowRight":
          event.preventDefault()
          moveFocus("right")
          break
        case "Enter":
          event.preventDefault()
          items[focusedIndex]?.onSelect?.()
          break
      }
    },
    [focusedIndex, moveFocus]
  )

  const getFocusProps = useCallback(
    (id: string, index: number) => {
      return {
        tabIndex: index === focusedIndex ? 0 : -1,
        ref: (el: HTMLElement | null) => {
          if (el) {
            const existingIndex = itemsRef.current.findIndex(item => item.id === id)
            const item: RovingFocusItem = {
              id,
              element: el,
              onSelect: undefined // Will be set when needed
            }

            if (existingIndex >= 0) {
              itemsRef.current[existingIndex] = item
            } else {
              registerItem(item)
            }
          } else {
            unregisterItem(id)
          }
        },
        onKeyDown: handleKeyDown
      }
    },
    [focusedIndex, registerItem, unregisterItem, handleKeyDown]
  )

  // Reset focus index when items change significantly
  useEffect(() => {
    if (itemsRef.current.length > 0 && focusedIndex >= itemsRef.current.length) {
      setFocusedIndex(0)
    }
  }, [focusedIndex])

  return {
    focusedIndex,
    setFocusedIndex,
    registerItem,
    unregisterItem,
    handleKeyDown,
    getFocusProps
  }
}
