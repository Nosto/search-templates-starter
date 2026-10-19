import { useEffect, useRef } from "preact/hooks"

/**
 * Subscribes to the browser `popstate` event and invokes the provided handler
 * whenever the active history entry changes (e.g. when the user navigates
 * with the back or forward buttons).
 *
 * @param handler - Function to execute when a `popstate` event is fired.
 */
export function usePopState(handler: () => void) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    const onPopState = () => handlerRef.current()
    window.addEventListener("popstate", onPopState)

    return () => {
      window.removeEventListener("popstate", onPopState)
    }
  }, [])
}
