import { useEffect } from "preact/hooks"

type Events = Record<"onClick" | "onInput" | "onFocus" | "onBlur" | "onSubmit", (e: Event) => void>

export function useDomEvents(el: HTMLElement | null, { onClick, onInput, onFocus, onBlur, onSubmit }: Partial<Events>) {
  useEffect(() => {
    if (!el) return
    const cleanups: (() => void)[] = []
    if (onClick) {
      el.addEventListener("click", onClick)
      cleanups.push(() => el.removeEventListener("click", onClick))
    }
    if (onInput) {
      el.addEventListener("input", onInput)
      cleanups.push(() => el.removeEventListener("input", onInput))
    }
    if (onFocus) {
      el.addEventListener("focus", onFocus)
      cleanups.push(() => el.removeEventListener("focus", onFocus))
    }
    if (onBlur) {
      el.addEventListener("blur", onBlur)
      cleanups.push(() => el.removeEventListener("blur", onBlur))
    }
    if (onSubmit) {
      el.addEventListener("submit", onSubmit)
      cleanups.push(() => el.removeEventListener("submit", onSubmit))
    }
    return () => cleanups.forEach(fn => fn())
  }, [el, onClick, onInput, onFocus, onBlur, onSubmit])
}
