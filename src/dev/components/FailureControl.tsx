import { clearFallbackSession } from "@/fallback/fallbackSession"
import { failureModes, getFailureMode, parseFailureMode, setFailureMode } from "@/dev/failureSimulation"
import styles from "./DevPanel.module.css"

/**
 * Switches the simulated failure mode. Changing the mode resets the fallback and reloads the page.
 */
export default function FailureControl() {
  function onModeChange(event: Event) {
    const mode = parseFailureMode((event.currentTarget as HTMLSelectElement).value)
    if (mode) {
      setFailureMode(mode)
      clearFallbackSession()
      location.reload()
    }
  }

  return (
    <label>
      Simulate Nosto error:
      <select className={styles.control} value={getFailureMode()} onChange={onModeChange}>
        {failureModes.map(mode => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    </label>
  )
}
