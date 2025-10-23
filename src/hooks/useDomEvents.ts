import { useEffect } from "preact/hooks"

type Events = Record<"onClick" | "onInput" | "onFocus" | "onBlur" | "onSubmit", (e: Event) => void> &
  Record<"onKeydown", (e: KeyboardEvent) => void>

export function useDomEvents(
  el: HTMLElement | null,
  { onClick, onInput, onFocus, onBlur, onSubmit, onKeydown }: Partial<Events>
) {
  useEffect(() => {
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
    if (onKeydown) {
      el.addEventListener("keydown", onKeydown)
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
      if (onBlur) el.removeEventListener("blur", onBlur)
      if (onSubmit) el.removeEventListener("submit", onSubmit)
      if (onKeydown) el.removeEventListener("keydown", onKeydown)
    }
  }, [el, onClick, onInput, onFocus, onBlur, onSubmit, onKeydown])
}
