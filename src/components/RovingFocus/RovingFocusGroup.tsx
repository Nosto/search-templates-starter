import { createContext } from "preact"
import { useContext, useState, useCallback, useRef } from "preact/hooks"
import { ComponentChildren } from "preact"

type RovingFocusItem = {
  element: HTMLElement
  id: string
}

type RovingFocusContextType = {
  registerItem: (id: string, element: HTMLElement) => void
  unregisterItem: (id: string) => void
  items: RovingFocusItem[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

const RovingFocusContext = createContext<RovingFocusContextType | undefined>(undefined)

type RovingFocusGroupProps = {
  children: ComponentChildren
  className?: string
  orientation?: "horizontal" | "vertical" | "both"
  loop?: boolean
}

export function RovingFocusGroup({
  children,
  className,
  orientation = "horizontal",
  loop = true
}: RovingFocusGroupProps) {
  const [items, setItems] = useState<RovingFocusItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const registerItem = useCallback((id: string, element: HTMLElement) => {
    setItems(current => {
      const existingIndex = current.findIndex(item => item.id === id)
      if (existingIndex >= 0) {
        const updated = [...current]
        updated[existingIndex] = { id, element }
        return updated
      }
      return [...current, { id, element }]
    })
  }, [])

  const unregisterItem = useCallback((id: string) => {
    setItems(current => current.filter(item => item.id !== id))
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (items.length === 0) return

      const isHorizontal = orientation === "horizontal" || orientation === "both"
      const isVertical = orientation === "vertical" || orientation === "both"

      let direction = 0

      if (isHorizontal && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        direction = event.key === "ArrowRight" ? 1 : -1
      } else if (isVertical && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        direction = event.key === "ArrowDown" ? 1 : -1
      }

      if (direction !== 0) {
        event.preventDefault()
        let newIndex = currentIndex + direction

        if (loop) {
          if (newIndex >= items.length) {
            newIndex = 0
          } else if (newIndex < 0) {
            newIndex = items.length - 1
          }
        } else {
          newIndex = Math.max(0, Math.min(items.length - 1, newIndex))
        }

        setCurrentIndex(newIndex)
        
        items.forEach((item, index) => {
          item.element.setAttribute("tabindex", index === newIndex ? "0" : "-1")
        })
        
        items[newIndex]?.element.focus()
      }
    },
    [items, currentIndex, orientation, loop]
  )

  const contextValue = {
    registerItem,
    unregisterItem,
    items,
    currentIndex,
    setCurrentIndex
  }

  return (
    <RovingFocusContext.Provider value={contextValue}>
      <div ref={containerRef} className={className} role="group" onKeyDown={handleKeyDown}>
        {children}
      </div>
    </RovingFocusContext.Provider>
  )
}

export function useRovingFocus() {
  const context = useContext(RovingFocusContext)
  if (context === undefined) {
    throw new Error("useRovingFocus must be used within a RovingFocusGroup")
  }
  return context
}
