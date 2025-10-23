import { createContext } from "preact"
import { useRef, useEffect } from "preact/hooks"
import { ComponentChildren } from "preact"

type RovingFocusContextType = {
  groupRef: { current: HTMLDivElement | null }
  orientation: "horizontal" | "vertical" | "both"
  loop: boolean
}

export const RovingFocusContext = createContext<RovingFocusContextType | undefined>(undefined)

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
  const groupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!groupRef.current) return

      const focusableElements = Array.from(
        groupRef.current.querySelectorAll("[data-roving-focus-item][tabindex]")
      ) as HTMLElement[]

      if (focusableElements.length === 0) return

      const currentFocused = document.activeElement as HTMLElement
      const currentIndex = focusableElements.indexOf(currentFocused)

      if (currentIndex === -1) return

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
          if (newIndex >= focusableElements.length) {
            newIndex = 0
          } else if (newIndex < 0) {
            newIndex = focusableElements.length - 1
          }
        } else {
          newIndex = Math.max(0, Math.min(focusableElements.length - 1, newIndex))
        }

        focusableElements.forEach((element, index) => {
          element.setAttribute("tabindex", index === newIndex ? "0" : "-1")
        })

        focusableElements[newIndex]?.focus()
      }
    }

    const group = groupRef.current
    if (!group) return

    group.addEventListener("keydown", handleKeyDown)
    return () => group.removeEventListener("keydown", handleKeyDown)
  }, [orientation, loop])

  const contextValue = {
    groupRef,
    orientation,
    loop
  }

  return (
    <RovingFocusContext.Provider value={contextValue}>
      <div ref={groupRef} className={className} role="group">
        {children}
      </div>
    </RovingFocusContext.Provider>
  )
}
