import { useRef, useEffect, useCallback } from "preact/hooks"
import { ComponentChildren, JSX } from "preact"
import { useRovingFocus } from "./RovingFocusGroup"

type RovingFocusItemProps = {
  children: ComponentChildren
  className?: string
  onFocus?: (event: FocusEvent) => void
  onClick?: (event: MouseEvent) => void
  style?: JSX.CSSProperties
}

export function RovingFocusItem({ children, className, onFocus, onClick, style }: RovingFocusItemProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const { groupRef } = useRovingFocus()

  useEffect(() => {
    if (!elementRef.current || !groupRef.current) return

    const allItems = Array.from(groupRef.current.querySelectorAll('[role="button"]')) as HTMLElement[]

    const isFirst = allItems.length === 1 && allItems[0] === elementRef.current
    elementRef.current.setAttribute("tabindex", isFirst ? "0" : "-1")
  }, [groupRef])

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      if (!elementRef.current || !groupRef.current) return

      const allItems = Array.from(groupRef.current.querySelectorAll('[role="button"]')) as HTMLElement[]

      const currentIndex = allItems.indexOf(elementRef.current)

      if (currentIndex !== -1) {
        allItems.forEach((item, index) => {
          item.setAttribute("tabindex", index === currentIndex ? "0" : "-1")
        })
      }

      onFocus?.(event)
    },
    [groupRef, onFocus]
  )

  const handleClick = useCallback(
    (event: MouseEvent) => {
      elementRef.current?.focus()
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
      style={style}
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
