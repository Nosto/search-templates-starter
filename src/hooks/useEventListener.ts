import { useEffect } from "preact/hooks"

type EventTargetWithEventMap = Document | HTMLElement | Window

type EventMap<T> = T extends Document
  ? DocumentEventMap
  : T extends Window
    ? WindowEventMap
    : T extends HTMLElement
      ? HTMLElementEventMap
      : never

type Props<T extends EventTargetWithEventMap, K extends keyof EventMap<T>> = {
  target: T | null
  eventName: K
  listener: (event: EventMap<T>[K]) => void
}

export function useEventListener<T extends EventTargetWithEventMap, K extends keyof EventMap<T>>({
  target,
  eventName,
  listener
}: Props<T, K>) {
  useEffect(() => {
    if (!target) {
      return
    }

    target.addEventListener(eventName as string, listener as EventListener)
    return () => {
      target.removeEventListener(eventName as string, listener as EventListener)
    }
  }, [target, eventName, listener])
}
