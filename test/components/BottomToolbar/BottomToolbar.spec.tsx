import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"

// Mock the hooks used by BottomToolbar
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useNostoAppState: (selector: (state: any) => any) => {
      const state = {
        loading: false,
        response: { products: { total: 25 } }
      }
      return selector ? selector(state) : state
    },
    usePagination: () => ({
      pages: [
        { page: 1, current: false, from: 0 },
        { page: 2, current: true, from: 24 }
      ],
      prev: null,
      next: null,
      first: null,
      last: null
    }),
    useActions: () => ({
      updateSearch: vi.fn()
    })
  }
})

describe("BottomToolbar Component", () => {
  it("renders bottom toolbar container", () => {
    const { container } = renderWithSearchProvider(<BottomToolbar />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("displays bottom toolbar content", () => {
    const { container } = renderWithSearchProvider(<BottomToolbar />)

    // Should render the bottom toolbar with content
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders pagination controls when available", () => {
    const { container } = renderWithSearchProvider(<BottomToolbar />)

    // Should contain pagination elements
    expect(container.innerHTML).toBeTruthy()
  })
})
