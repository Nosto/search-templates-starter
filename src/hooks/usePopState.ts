import { useEffect, useRef } from "preact/hooks"

/**
 * Subscribes to the browser `popstate` event and invokes the provided handler
 * whenever the active history entry changes (e.g. when the user navigates
 * with the back or forward buttons).
 *
 * The latest `handler` reference is stored in an internal ref so the
 * attached event listener always calls the most recent callback without
 * re-registering the listener on every render.
 *
 * In most cases you do not need to memoize `handler` with `useCallback`,
 * but you may still choose to do so if it captures expensive computations
 * or other values you want to keep stable.
 *
 * @param handler - Function to execute when a `popstate` event is fired.
 */
export function usePopState(handler: () => void) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    function handlePopState() {
      handlerRef.current()
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])
}
