import { render } from "preact"
import { useState } from "preact/hooks"
import { getSessionStorageItem, setSessionStorageItem } from "@nosto/search-js/utils"
import FailureControl from "./FailureControl"
import FallbackStatus from "./FallbackStatus"
import styles from "./DevPanel.module.css"

const collapsedKey = "nosto:search-js:dev:panel-collapsed"

/**
 * Renders the dev panel as its own Preact root, so it keeps working while the template is unmounted or disabled
 */
export function mountDevPanel() {
  const container = document.createElement("div")
  document.body.append(container)
  render(<DevPanel />, container)
}

function DevPanel() {
  const [collapsed, setCollapsed] = useState(() => getSessionStorageItem<boolean>(collapsedKey) ?? false)

  function toggleCollapsed() {
    setCollapsed(!collapsed)
    setSessionStorageItem(collapsedKey, !collapsed)
  }

  return (
    <div className={styles.panel}>
      {!collapsed && (
        <div className={styles.tools}>
          <FailureControl />
          <FallbackStatus />
        </div>
      )}
      <button
        type="button"
        className={styles.toggle}
        onClick={toggleCollapsed}
        aria-expanded={!collapsed}
        title={collapsed ? "Show dev tools" : "Hide dev tools"}
      >
        {collapsed ? "«" : "»"}
      </button>
    </div>
  )
}
