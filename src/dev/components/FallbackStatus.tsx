import { useEffect, useState } from "preact/hooks"
import { clearFallbackSession, getFallbackExpiry, isFallbackActive } from "@/fallback/fallbackSession"
import styles from "./DevPanel.module.css"

/**
 * Shows whether the native fallback is active, with a reset button to re-enable the template
 */
export default function FallbackStatus() {
  const expiry = useFallbackExpiry()

  function resetFallback() {
    clearFallbackSession()
    location.reload()
  }

  if (!expiry) {
    return <span>Fallback: inactive</span>
  }

  return (
    <span>
      Fallback active until {new Date(expiry).toLocaleTimeString()}
      <button type="button" className={styles.control} onClick={resetFallback}>
        Reset
      </button>
    </span>
  )
}

// the fallback can start at any time while the page is open, so the status is polled
function useFallbackExpiry() {
  const [expiry, setExpiry] = useState(readActiveExpiry)

  useEffect(() => {
    const interval = setInterval(() => setExpiry(readActiveExpiry()), 1000)
    return () => clearInterval(interval)
  }, [])

  return expiry
}

function readActiveExpiry() {
  return isFallbackActive() ? getFallbackExpiry() : undefined
}
