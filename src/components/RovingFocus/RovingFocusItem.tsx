import { useRef, useEffect, useCallback } from "preact/hooks"
import { ComponentChildren } from "preact"
import { useRovingFocus } from "./RovingFocusGroup"

type RovingFocusItemProps = {
  children: ComponentChildren
  id?: string
  className?: string
  onFocus?: (event: FocusEvent) => void
  onClick?: (event: MouseEvent) => void
}

export function RovingFocusItem({ children, id, className, onFocus, onClick }: RovingFocusItemProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const { registerItem, unregisterItem, items, setCurrentIndex } = useRovingFocus()
  const itemId = id || `roving-focus-item-${Math.random().toString(36).substring(2, 9)}`

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    registerItem(itemId, element)
    
    const isFirst = items.length === 0
    if (isFirst) {
      element.setAttribute("tabindex", "0")
    } else {
      element.setAttribute("tabindex", "-1")
    }

    return () => unregisterItem(itemId)
  }, [registerItem, unregisterItem, itemId, items.length])

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      const element = elementRef.current
      if (!element) return

      const itemIndex = items.findIndex(item => item.element === element)
      if (itemIndex !== -1) {
        setCurrentIndex(itemIndex)
      }

      onFocus?.(event)
    },
    [items, setCurrentIndex, onFocus]
  )

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const element = elementRef.current
      if (!element) return

      element.focus()
      onClick?.(event)
    },
    [onClick]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onClick?.(event as unknown as MouseEvent)
      }
    },
    [onClick]
  )

  return (
    <div
      ref={elementRef}
      className={className}
      tabIndex={-1}
      role="button"
      onFocus={handleFocus}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}
