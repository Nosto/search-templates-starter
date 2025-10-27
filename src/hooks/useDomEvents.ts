import { useEffect } from "preact/hooks"

type Events = Record<"onClick" | "onInput" | "onFocus" | "onKeyDown" | "onBlur" | "onSubmit", (e: Event) => void>

export function useDomEvents(
  el: HTMLElement | null,
  { onClick, onInput, onFocus, onKeyDown, onBlur, onSubmit }: Partial<Events>
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
  }, [el, onClick, onInput, onFocus, onKeyDown, onBlur, onSubmit])
}
