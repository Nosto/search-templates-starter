import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import {
  mockFailingAutocomplete,
  mockMalformedAutocomplete,
  mockMalformedSearch,
  mockSearch,
  mockUnavailableSearch
} from "@mocks/search"
import {
  findProductLinks,
  loadTemplatePage,
  nativeContent,
  submitNatively,
  typeIntoSearch,
  waitForPageToRender,
  waitForSearchRetries
} from "../utils/templatePage"

describe("fallback", () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("replaces native content with search results", async () => {
    const { results } = await loadTemplatePage()
    await waitForPageToRender()

    expect(findProductLinks(results)).not.toHaveLength(0)
    expect(results.textContent).not.toContain(nativeContent)
  })

  it("restores native content when search is unavailable", async () => {
    const { results, nativeResultsHtml } = await loadTemplatePage({ search: mockUnavailableSearch() })
    await waitForPageToRender()
    expect(results.textContent).not.toContain(nativeContent)

    await waitForSearchRetries()

    expect(results.innerHTML).toBe(nativeResultsHtml)
  })

  it("restores native content on category pages", async () => {
    const { results, nativeResultsHtml } = await loadTemplatePage({
      url: "/",
      pageType: "category",
      search: mockUnavailableSearch()
    })
    await waitForPageToRender()
    expect(results.textContent).not.toContain(nativeContent)

    await waitForSearchRetries()

    expect(results.innerHTML).toBe(nativeResultsHtml)
  })

  it("hands the search form back to the browser", async () => {
    const { form } = await loadTemplatePage({ search: mockUnavailableSearch() })
    await waitForPageToRender()
    // the template intercepts the form while mounted
    expect(submitNatively(form)).toBe(false)

    await waitForSearchRetries()

    expect(submitNatively(form)).toBe(true)
  })

  it("keeps event listeners on native content working", async () => {
    const { nativeButton } = await loadTemplatePage({ search: mockUnavailableSearch() })
    let clicks = 0
    nativeButton.addEventListener("click", () => clicks++)
    await waitForPageToRender()
    expect(nativeButton.isConnected).toBe(false)

    await waitForSearchRetries()
    nativeButton.click()

    expect(clicks).toBe(1)
  })

  it("stays native on later page loads", async () => {
    await loadTemplatePage({ search: mockUnavailableSearch() })
    await waitForSearchRetries()

    const { results, form, resultSearches } = await loadTemplatePage({ search: mockSearch })
    await waitForSearchRetries()

    expect(resultSearches).toHaveLength(0)
    expect(results.textContent).toContain(nativeContent)
    expect(submitNatively(form)).toBe(true)
  })

  it("keeps the template on bad requests", async () => {
    const { results, resultSearches } = await loadTemplatePage({ search: mockUnavailableSearch(400) })
    await waitForSearchRetries()

    // bad requests are not retried
    expect(resultSearches).toHaveLength(1)
    expect(results.textContent).not.toContain(nativeContent)
  })

  it("keeps the template when autocomplete fails", async () => {
    const { results, input, autocompleteSearches } = await loadTemplatePage({ search: mockFailingAutocomplete() })
    await waitForPageToRender()
    expect(findProductLinks(results)).not.toHaveLength(0)

    typeIntoSearch(input, "runn")
    await waitForSearchRetries()

    expect(autocompleteSearches).not.toHaveLength(0)
    expect(findProductLinks(results)).not.toHaveLength(0)
  })

  it("keeps the template when the autocomplete dropdown fails to render", async () => {
    const { results, input, dropdown } = await loadTemplatePage({ search: mockMalformedAutocomplete() })
    await waitForPageToRender()

    typeIntoSearch(input, "runn")
    await waitForSearchRetries()

    expect(dropdown.textContent).toBe("")
    expect(findProductLinks(results)).not.toHaveLength(0)
  })

  it("restores native content when the template fails to render", async () => {
    const { results, nativeResultsHtml } = await loadTemplatePage({ search: mockMalformedSearch() })
    await waitForPageToRender()

    expect(results.innerHTML).toBe(nativeResultsHtml)
  })
})
