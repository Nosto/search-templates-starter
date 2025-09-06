import { useEffect } from "preact/hooks"

type UseEventListenerProps = {
  target: EventTarget | null
  eventName: string
  listener: (event: Event) => void
  condition?: boolean
}

export function useEventListener({ target, eventName, listener, condition = true }: UseEventListenerProps) {
  useEffect(() => {
    if (!target || !condition) {
      return
    }

    target.addEventListener(eventName, listener)

    return () => {
      target.removeEventListener(eventName, listener)
    }
  }, [target, eventName, listener, condition])
}
