import { useEffect } from "preact/hooks"

export function usePopState(handler: () => void) {
  useEffect(() => {
    window.addEventListener("popstate", handler)

    return () => {
      window.removeEventListener("popstate", handler)
    }
  }, [handler])
}
