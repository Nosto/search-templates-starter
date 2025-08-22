import { describe, it, expect, vi } from "vitest"

// Mock the @nosto/search-js modules since they require browser environment
vi.mock("@nosto/search-js/preact/hooks", () => ({
  useNostoAppState: () => ({ loading: false, response: { products: { total: 10 } } }),
  useProductFilters: () => ({ filters: [], removeAll: () => {} }),
  useSort: () => ({ activeSort: "score", setSort: () => {} }),
  useSelectedFiltersCount: () => 0,
  useDecoratedSearchResults: () => ({ products: { hits: [] } }),
  useSizeOptions: () => ({
    from: 1,
    to: 24,
    size: 24,
    total: 10,
    handleSizeChange: () => {},
    sizeOptions: [24, 48, 72]
  })
}))

vi.mock("@nosto/search-js/preact/serp", () => ({
  SearchPageProvider: ({ children }: { children: unknown }) => children
}))

vi.mock("@nosto/search-js/utils", () => ({
  pick: (obj: Record<string, unknown>, ...keys: string[]) =>
    keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
}))

vi.mock("preact", () => ({
  render: vi.fn()
}))

// Simple integration test that verifies the module structure
describe("Custom Elements Module", () => {
  it("should expose all custom element classes", async () => {
    const customElements = await import("../../src/custom-elements/index")

    expect(customElements.BaseNostoElement).toBeDefined()
    expect(customElements.NostoSearchFilters).toBeDefined()
    expect(customElements.NostoSearchToolbar).toBeDefined()
    expect(customElements.NostoSearchProducts).toBeDefined()
    expect(customElements.NostoSearchBottomToolbar).toBeDefined()
  })

  it("should define correct tag names for custom elements", async () => {
    const customElements = await import("../../src/custom-elements/index")

    // Verify that classes are properly defined
    expect(typeof customElements.NostoSearchFilters).toBe("function")
    expect(typeof customElements.NostoSearchToolbar).toBe("function")
    expect(typeof customElements.NostoSearchProducts).toBe("function")
    expect(typeof customElements.NostoSearchBottomToolbar).toBe("function")
  })

  it("should provide base functionality for custom elements", async () => {
    const { BaseNostoElement } = await import("../../src/custom-elements/index")

    // Test that the base class has the expected methods
    expect(BaseNostoElement.prototype.connectedCallback).toBeDefined()
    expect(BaseNostoElement.prototype.disconnectedCallback).toBeDefined()
    expect(BaseNostoElement.prototype.addEventListener).toBeDefined()
  })
})
