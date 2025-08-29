import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { createElement } from "preact"
import { render as preactRender } from "preact"
import NostoDynamicCard from "../../src/components/NostoDynamicCard/NostoDynamicCard"

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe("NostoDynamicCard", () => {
  let container: HTMLElement

  beforeEach(() => {
    vi.useFakeTimers()
    container = document.createElement("div")
    document.body.appendChild(container)
    mockFetch.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.removeChild(container)
    vi.clearAllMocks()
  })

  it("throws error when handle is missing", () => {
    expect(() => {
      preactRender(
        // @ts-expect-error - Testing missing required prop
        createElement(NostoDynamicCard, { template: "product-card" }),
        container
      )
    }).toThrow("NostoDynamicCard requires a 'handle' prop")
  })

  it("throws error when both section and template are missing", () => {
    expect(() => {
      preactRender(createElement(NostoDynamicCard, { handle: "test-product" }), container)
    }).toThrow("NostoDynamicCard requires either 'section' or 'template' prop")
  })

  it("fetches markup with template parameters", async () => {
    const mockMarkup = "<div>Product template content</div>"
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockMarkup)
    })

    preactRender(
      createElement(NostoDynamicCard, {
        handle: "test-product",
        template: "product-card",
        variantId: "12345"
      }),
      container
    )

    // Wait for the fetch to be called and component to update
    await vi.advanceTimersByTimeAsync(50)

    expect(mockFetch).toHaveBeenCalledWith("/products/test-product?view=product-card&layout=none&variant=12345")
    expect(container.innerHTML).toContain(mockMarkup)
  })

  it("fetches markup with section parameters", async () => {
    const mockMarkup = "<div>Product section content</div>"
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(`<body><div>${mockMarkup}</div></body>`)
    })

    preactRender(
      createElement(NostoDynamicCard, {
        handle: "test-product",
        section: "product-section"
      }),
      container
    )

    // Wait for the fetch to be called and component to update
    await vi.advanceTimersByTimeAsync(50)

    expect(mockFetch).toHaveBeenCalledWith("/products/test-product?section_id=product-section")

    // Wait for component to update after fetch
    await vi.advanceTimersByTimeAsync(50)

    expect(container.innerHTML).toContain(mockMarkup)
  })

  it("shows error state when fetch fails", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found"
    })

    preactRender(createElement(NostoDynamicCard, { handle: "test-product", template: "product-card" }), container)

    // Wait for component to update after fetch error
    await vi.advanceTimersByTimeAsync(50)

    expect(container.textContent).toContain("Failed to fetch product data: 404 Not Found")
  })

  it("shows error when markup contains invalid tags", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("<html><body>Invalid content</body></html>")
    })

    preactRender(createElement(NostoDynamicCard, { handle: "test-product", template: "product-card" }), container)

    // Wait for component to update after fetch
    await vi.advanceTimersByTimeAsync(50)

    expect(container.textContent).toContain("Invalid markup")
  })

  it("processes section markup correctly", async () => {
    const sectionContent = '<div class="product">Section content</div>'
    const fullMarkup = `<html><body><section>${sectionContent}</section></body></html>`

    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(fullMarkup)
    })

    preactRender(createElement(NostoDynamicCard, { handle: "test-product", section: "product-section" }), container)

    // Wait for component to update after fetch
    await vi.advanceTimersByTimeAsync(50)

    expect(container.innerHTML).toContain('class="product"')
    expect(container.innerHTML).toContain("Section content")
  })
})
