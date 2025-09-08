import { useEffect } from "preact/hooks"

// Type-safe event listener hook using overloads for different target types
export function useEventListener<K extends keyof DocumentEventMap>(params: {
  target: Document | null
  eventName: K
  listener: (event: DocumentEventMap[K]) => void
}): void

export function useEventListener<K extends keyof HTMLElementEventMap>(params: {
  target: HTMLElement | null
  eventName: K
  listener: (event: HTMLElementEventMap[K]) => void
}): void

export function useEventListener<K extends keyof WindowEventMap>(params: {
  target: Window | null
  eventName: K
  listener: (event: WindowEventMap[K]) => void
}): void

// Fallback for other EventTarget types
export function useEventListener(params: {
  target: EventTarget | null
  eventName: string
  listener: (event: Event) => void
}): void

// Implementation
export function useEventListener({
  target,
  eventName,
  listener
}: {
  target: EventTarget | null
  eventName: string
  listener: (event: Event) => void
}): void {
  useEffect(() => {
    if (!target) {
      return
    }

    target.addEventListener(eventName, listener)

    return () => {
      target.removeEventListener(eventName, listener)
    }
  }, [target, eventName, listener])
}
