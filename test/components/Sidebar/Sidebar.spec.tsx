import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Sidebar from "@/components/Sidebar/Sidebar"

// Mock the hooks and facet components
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useFacets: (): any => ({
      loading: false,
      facets: [
        {
          id: "brand",
          name: "Brand",
          type: "terms",
          field: "brand",
          data: [{ value: "test-brand", count: 5, selected: false }]
        }
      ]
    })
  }
})

vi.mock("@/components/Facet/Facet", () => ({
  default: ({ facet }: any) => <div data-testid="facet">{facet.name} Facet</div>
}))

describe("Sidebar Component", () => {
  it("renders filters section when facets exist", () => {
    const { container } = renderWithSearchProvider(<Sidebar />)

    expect(container).toBeTruthy()
    expect(container.textContent).toContain("Filters")
  })

  it("renders facets when available", () => {
    const { container } = renderWithSearchProvider(<Sidebar />)

    // Should contain facet components from mock data
    expect(container.textContent).toContain("Brand Facet")
  })

  it("includes toggle button for mobile", () => {
    const { container } = renderWithSearchProvider(<Sidebar />)

    const toggleInput = container.querySelector("input[type='checkbox']")
    expect(toggleInput).toBeTruthy()
  })
})
