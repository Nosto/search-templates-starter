import { useEffect } from "preact/hooks"

type Props<K extends keyof DocumentEventMap> = {
  target: Document | null
  eventName: K
  listener: (event: DocumentEventMap[K]) => void
}

export function useEventListener<K extends keyof DocumentEventMap>({ target, eventName, listener }: Props<K>) {
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
