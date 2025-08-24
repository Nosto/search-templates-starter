import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Pagination from "@/components/Pagination/Pagination"

// Mock the pagination hooks
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    usePagination: () => ({
      pages: [
        { page: 1, current: false, from: 0 },
        { page: 2, current: true, from: 24 },
        { page: 3, current: false, from: 48 }
      ],
      prev: null,
      next: { page: 3, current: false, from: 48 },
      first: null,
      last: null
    }),
    useActions: () => ({
      updateSearch: vi.fn()
    })
  }
})

describe("Pagination Component", () => {
  it("renders pagination container", () => {
    const { container } = renderWithSearchProvider(<Pagination />)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders page numbers when pagination data is available", () => {
    const { container } = renderWithSearchProvider(<Pagination />)

    // Should contain page numbers from mock data
    expect(container.textContent).toContain("1")
    expect(container.textContent).toContain("2")
    expect(container.textContent).toContain("3")
  })
})
