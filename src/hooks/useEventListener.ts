import { useEffect } from "preact/hooks"

type UseEventListenerProps = {
  target: EventTarget | null
  eventName: string
  listener: (event: Event) => void
}

export function useEventListener({ target, eventName, listener }: UseEventListenerProps) {
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
