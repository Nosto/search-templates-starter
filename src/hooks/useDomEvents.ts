import { useEffect } from "preact/hooks"
import type { RefObject } from "preact"

type Events = {
  onClick: (e: MouseEvent) => void
  onInput: (e: Event) => void
  onFocus: (e: FocusEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
  onBlur: (e: FocusEvent) => void
  onSubmit: (e: SubmitEvent) => void
}

type MaybeRef<T extends HTMLElement = HTMLElement> = T | null | RefObject<T | null>

function isRef<T extends HTMLElement>(maybeRef: MaybeRef<T>): maybeRef is RefObject<T | null> {
  return maybeRef !== null && typeof maybeRef === "object" && "current" in maybeRef
}

export function useDomEvents<T extends HTMLElement = HTMLElement>(
  maybeRef: MaybeRef<T>,
  { onClick, onInput, onFocus, onKeyDown, onBlur, onSubmit }: Partial<Events>
) {
  useEffect(() => {
    const el = isRef(maybeRef) ? maybeRef.current : maybeRef
    if (!el) return
    if (onClick) {
      el.addEventListener("click", onClick)
    }
    if (onInput) {
      el.addEventListener("input", onInput)
    }
    if (onFocus) {
      el.addEventListener("focus", onFocus)
    }
    if (onKeyDown) {
      el.addEventListener("keydown", onKeyDown)
    }
    if (onBlur) {
      el.addEventListener("blur", onBlur)
    }
    if (onSubmit) {
      el.addEventListener("submit", onSubmit)
    }
    return () => {
      if (onClick) el.removeEventListener("click", onClick)
      if (onInput) el.removeEventListener("input", onInput)
      if (onFocus) el.removeEventListener("focus", onFocus)
      if (onKeyDown) el.removeEventListener("keydown", onKeyDown)
      if (onBlur) el.removeEventListener("blur", onBlur)
      if (onSubmit) el.removeEventListener("submit", onSubmit)
    }
  }, [maybeRef, onClick, onInput, onFocus, onKeyDown, onBlur, onSubmit])
}
