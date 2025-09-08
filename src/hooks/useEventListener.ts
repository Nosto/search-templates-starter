import { useEffect } from "preact/hooks"

export function useEventListener<K extends keyof DocumentEventMap>({
  target,
  eventName,
  listener
}: {
  target: Document | null
  eventName: K
  listener: (event: DocumentEventMap[K]) => void
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
