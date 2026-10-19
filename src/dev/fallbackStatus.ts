import { clearFallbackSession, getFallbackExpiry, isFallbackActive } from "@/fallback/fallbackSession"

function renderStatus(status: HTMLElement) {
  if (!isFallbackActive()) {
    status.replaceChildren("Fallback: inactive")
    return
  }

  const until = new Date(getFallbackExpiry() ?? Date.now()).toLocaleTimeString()

  const reset = document.createElement("button")
  reset.type = "button"
  reset.textContent = "Reset"
  reset.style.marginLeft = "6px"
  reset.addEventListener("click", () => {
    clearFallbackSession()
    location.reload()
  })

  status.replaceChildren(`Fallback active until ${until}`, reset)
}

/**
 * Dev panel tool showing whether the native fallback is active, with a reset button to re-enable the template.
 */
export function createFallbackStatus() {
  const status = document.createElement("span")
  renderStatus(status)
  setInterval(() => renderStatus(status), 1000)
  return status
}
