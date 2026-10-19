import type { API } from "@nosto/nosto-js/client"
import { readSession, writeSession } from "./storage"
import { clearFallbackSession } from "@/fallback/fallbackSession"

const failureModes = ["off", "error", "timeout"] as const

type FailureMode = (typeof failureModes)[number]

type SearchFn = API["search"]

const storageKey = "nosto:dev:simulate-failure"
const timeoutMs = 5000

function parseFailureMode(value: string | null | undefined) {
  return failureModes.find(mode => mode === value)
}

/**
 * Resolves the simulated failure mode from sessionStorage, so the mode survives template navigation and reloads.
 */
function getFailureMode(): FailureMode {
  return parseFailureMode(readSession(storageKey)) ?? "off"
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Wraps the search function so that it behaves as if the Nosto search service failed.
 * The mode is read on every call, so a failure can start while the page is open.
 */
export function withSimulatedFailure(search: SearchFn): SearchFn {
  return async (query, options) => {
    switch (getFailureMode()) {
      case "error":
        throw Object.assign(new Error("[Dev] Simulated Nosto search failure"), { status: 503 })
      case "timeout":
        await delay(timeoutMs)
        throw new Error("[Dev] Simulated Nosto search timeout exceeded")
      default:
        return search(query, options)
    }
  }
}

/**
 * Dev panel tool for switching the simulated failure mode. Changing the mode resets the fallback and reloads the page.
 */
export function createFailureControl() {
  const current = getFailureMode()
  const label = document.createElement("label")
  label.textContent = "Simulate Nosto error:"

  const select = document.createElement("select")
  select.style.marginLeft = "6px"
  select.append(...failureModes.map(mode => new Option(mode, mode, false, mode === current)))
  select.addEventListener("change", () => {
    const mode = parseFailureMode(select.value)
    if (mode) {
      writeSession(storageKey, mode)
      clearFallbackSession()
      location.reload()
    }
  })

  label.append(select)
  return label
}
