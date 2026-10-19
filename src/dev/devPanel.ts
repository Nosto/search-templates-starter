import { readSession, writeSession } from "./storage"
import { createFailureControl } from "./failureSimulation"
import { createFallbackStatus } from "./fallbackStatus"

const collapsedKey = "nosto:dev:panel-collapsed"

/**
 * Mounts a collapsible dev tools panel in the bottom right corner of the page
 */
export function mountDevPanel() {
  renderPanel(createFailureControl(), createFallbackStatus())
}

function renderPanel(...tools: HTMLElement[]) {
  const panel = document.createElement("div")
  panel.style.cssText =
    "position:fixed;bottom:8px;right:8px;z-index:2147483647;display:flex;align-items:center;height:32px;border-radius:4px;overflow:hidden;background:#222;color:#fff;font:12px sans-serif"

  const content = document.createElement("div")
  content.style.cssText = "display:flex;align-items:center;gap:12px;padding-left:8px"
  content.append(...tools)

  const toggle = document.createElement("button")
  toggle.type = "button"
  toggle.style.cssText =
    "align-self:stretch;min-width:28px;padding:0 8px;border:0;background:none;color:inherit;font:16px sans-serif;cursor:pointer"

  const setCollapsed = (collapsed: boolean) => {
    content.style.display = collapsed ? "none" : "flex"
    toggle.textContent = collapsed ? "«" : "»"
    toggle.title = collapsed ? "Show dev tools" : "Hide dev tools"
    toggle.setAttribute("aria-expanded", String(!collapsed))
    writeSession(collapsedKey, String(collapsed))
  }
  toggle.addEventListener("click", () => setCollapsed(content.style.display !== "none"))

  panel.append(content, toggle)
  setCollapsed(readSession(collapsedKey) === "true")
  document.body.append(panel)
}
