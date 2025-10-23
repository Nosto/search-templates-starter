import { useRef, useEffect, useCallback } from "preact/hooks"
import { ComponentChildren, cloneElement, VNode } from "preact"
import { useRovingFocus } from "./useRovingFocus"

type RovingFocusItemProps = {
  children: ComponentChildren
}

export function RovingFocusItem({ children }: RovingFocusItemProps) {
  const elementRef = useRef<HTMLElement>(null)
  const { groupRef } = useRovingFocus()

  useEffect(() => {
    if (!elementRef.current || !groupRef.current) return

    const allItems = Array.from(groupRef.current.querySelectorAll("[data-roving-focus-item]")) as HTMLElement[]

    const isFirst = allItems.length === 1 && allItems[0] === elementRef.current
    elementRef.current.setAttribute("tabindex", isFirst ? "0" : "-1")
  }, [groupRef])

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      if (!elementRef.current || !groupRef.current) return

      const allItems = Array.from(groupRef.current.querySelectorAll("[data-roving-focus-item]")) as HTMLElement[]

      const currentIndex = allItems.indexOf(elementRef.current)

      if (currentIndex !== -1) {
        allItems.forEach((item, index) => {
          item.setAttribute("tabindex", index === currentIndex ? "0" : "-1")
        })
      }

      // Call original onFocus if it exists
      const element = elementRef.current as HTMLElement & { _originalOnFocus?: (event: FocusEvent) => void }
      element._originalOnFocus?.(event)
    },
    [groupRef]
  )

  const handleClick = useCallback((event: MouseEvent) => {
    elementRef.current?.focus()

    // Call original onClick if it exists
    const element = elementRef.current as HTMLElement & { _originalOnClick?: (event: MouseEvent) => void }
    element._originalOnClick?.(event)
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      const element = elementRef.current as HTMLElement & { _originalOnClick?: (event: MouseEvent) => void }
      element._originalOnClick?.(event as unknown as MouseEvent)
    }

    // Call original onKeyDown if it exists
    const element = elementRef.current as HTMLElement & { _originalOnKeyDown?: (event: KeyboardEvent) => void }
    element._originalOnKeyDown?.(event)
  }, [])

  // Clone the child element and add roving focus props
  if (typeof children === "object" && children && "type" in children) {
    const child = children as VNode<Record<string, unknown>>
    const originalProps = child.props || {}

    return cloneElement(child, {
      ...originalProps,
      ref: (element: HTMLElement) => {
        elementRef.current = element
        const extendedElement = element as HTMLElement & {
          _originalOnFocus?: (event: FocusEvent) => void
          _originalOnClick?: (event: MouseEvent) => void
          _originalOnKeyDown?: (event: KeyboardEvent) => void
        }
        if (element && originalProps.onFocus) {
          extendedElement._originalOnFocus = originalProps.onFocus as (event: FocusEvent) => void
        }
        if (element && originalProps.onClick) {
          extendedElement._originalOnClick = originalProps.onClick as (event: MouseEvent) => void
        }
        if (element && originalProps.onKeyDown) {
          extendedElement._originalOnKeyDown = originalProps.onKeyDown as (event: KeyboardEvent) => void
        }
        // Call original ref if it exists
        if (typeof originalProps.ref === "function") {
          ;(originalProps.ref as (element: HTMLElement) => void)(element)
        }
      },
      tabIndex: -1,
      "data-roving-focus-item": true,
      onFocus: handleFocus,
      onClick: handleClick,
      onKeyDown: handleKeyDown
    })
  }

  // Fallback for non-element children (shouldn't happen in normal usage)
  return children
}
