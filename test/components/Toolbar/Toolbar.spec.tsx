import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Toolbar from "@/components/Toolbar/Toolbar"

// Mock the required hooks
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useNostoAppState: (selector: (state: any) => any) => {
      const state = {
        loading: false,
        response: { products: { total: 15 } }
      }
      return selector ? selector(state) : state
    },
    useSort: () => ({
      activeSort: "score",
      setSort: vi.fn()
    }),
    useSelectedFiltersCount: () => 2
  }
})

describe("Toolbar Component", () => {
  it("renders toolbar container", () => {
    const { container } = renderWithSearchProvider(<Toolbar />)

    expect(container).toBeTruthy()
    const toolbarContainer = container.querySelector("div")
    expect(toolbarContainer).toBeTruthy()
  })

  it("displays product count when not loading", () => {
    const { container } = renderWithSearchProvider(<Toolbar />)

    expect(container.textContent).toContain("15 products")
  })

  it("renders filter button with badge for selected filters", () => {
    const { container } = renderWithSearchProvider(<Toolbar />)

    expect(container.textContent).toContain("Filter")
    // Should show badge with filter count
    expect(container.textContent).toContain("2")
  })

  it("renders sort dropdown", () => {
    const { container } = renderWithSearchProvider(<Toolbar />)

    const select = container.querySelector("select")
    expect(select).toBeTruthy()
    expect(container.textContent).toContain("Sort by")
  })
})
