import { useEffect, useRef } from "preact/hooks"

export function useEventListener<K extends keyof DocumentEventMap>({
  target,
  eventName,
  listener
}: {
  target?: Document | null
  eventName: K
  listener: (event: DocumentEventMap[K]) => void
}) {
  const listenerRef = useRef(listener)

  useEffect(() => {
    listenerRef.current = listener
  }, [listener])

  useEffect(() => {
    if (!target) {
      return
    }

    const currentListener = (event: DocumentEventMap[K]) => listenerRef.current(event)
    target.addEventListener(eventName, currentListener)

    return () => {
      target.removeEventListener(eventName, currentListener)
    }
  }, [target, eventName])
}
