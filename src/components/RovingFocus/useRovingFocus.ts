import { useContext } from "preact/hooks"
import { RovingFocusContext } from "./RovingFocusGroup"

export function useRovingFocus() {
  const context = useContext(RovingFocusContext)
  if (context === undefined) {
    throw new Error("useRovingFocus must be used within a RovingFocusGroup")
  }
  return context
}
