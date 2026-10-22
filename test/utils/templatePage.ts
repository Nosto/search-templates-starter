import { vi } from "vitest"
import { mockNostojs } from "@nosto/nosto-js/testing"
import type { SearchQuery } from "@nosto/nosto-js/client"
import { isAutocompleteQuery, mockSearch, MockSearch } from "@mocks/search"
import { baseConfig } from "@/config"

export const nativeContent = "Native search results rendered by the store platform."

const nativePage = `
  <form id="search-form">
    <input type="text" id="search" name="q" />
    <div id="dropdown"></div>
  </form>
  <main id="serp">
    <p>${nativeContent}</p>
    <button type="button" id="native-button">Native button</button>
  </main>
`

type PageOptions = {
  url?: string
  pageType?: "search" | "category"
  search?: MockSearch
}

/**
 * Simulates a page load: renders the platform's native page and runs the real injected entry.
 */
export async function loadTemplatePage({
  url = "/?q=shoes",
  pageType = "search",
  search = mockSearch
}: PageOptions = {}) {
  const resultSearches: SearchQuery[] = []
  const autocompleteSearches: SearchQuery[] = []

  history.replaceState(null, "", url)
  document.body.innerHTML = nativePage
  mockNostojs({
    internal: { logger: silentLogger },
    pageTagging: () => ({ pageType }),
    // @ts-expect-error partial mock
    pageTaggingAsync: async () => ({ pageType }),
    setTaggingProvider: () => {},
    recordSearchSubmit: async () => {},
    search: async (query: SearchQuery) => {
      ;(isAutocompleteQuery(query) ? autocompleteSearches : resultSearches).push(query)
      return search(query)
    }
  })

  // looked up before the template moves native content out of the page
  const page = {
    resultSearches,
    autocompleteSearches,
    results: document.querySelector<HTMLElement>("#serp")!,
    nativeResultsHtml: document.querySelector<HTMLElement>("#serp")!.innerHTML,
    form: document.querySelector<HTMLFormElement>("#search-form")!,
    input: document.querySelector<HTMLInputElement>("#search")!,
    dropdown: document.querySelector<HTMLElement>("#dropdown")!,
    nativeButton: document.querySelector<HTMLButtonElement>("#native-button")!
  }

  vi.resetModules()
  await import("@/entries/injected")
  return page
}

export function findProductLinks(results: HTMLElement) {
  return results.querySelectorAll('a[href^="https://example.com/product-"]')
}

export function typeIntoSearch(input: HTMLInputElement, text: string) {
  input.dispatchEvent(new FocusEvent("focus"))
  input.value = text
  input.dispatchEvent(new Event("input", { bubbles: true }))
}

export function submitNatively(form: HTMLFormElement) {
  return form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))
}

export async function waitForPageToRender() {
  await vi.advanceTimersByTimeAsync(100)
}

export async function waitForSearchRetries() {
  const { maxRetries, retryInterval } = baseConfig.search
  await vi.advanceTimersByTimeAsync((maxRetries + 1) * retryInterval)
}

const silentLogger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {}
}
