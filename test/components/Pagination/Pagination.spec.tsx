import { render } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import Pagination from "@/components/Pagination/Pagination"
import * as hooks from "@nosto/search-js/preact/hooks"

// Mock the hooks module
vi.mock("@nosto/search-js/preact/hooks", () => ({
  usePagination: vi.fn(),
  useActions: vi.fn()
}))

describe("Pagination", () => {
  const mockActions = {
    newSearch: vi.fn(),
    updateSearch: vi.fn(),
    toggleProductFilter: vi.fn(),
    replaceFilter: vi.fn()
  }

  beforeEach(() => {
    vi.mocked(hooks.useActions).mockReturnValue(mockActions)
  })

  it("renders nothing when totalPages is 0", () => {
    vi.mocked(hooks.usePagination).mockReturnValue({
      totalPages: 0,
      resultsFrom: 0,
      resultsTo: 0,
      pages: [],
      prev: undefined,
      next: undefined,
      first: undefined,
      last: undefined,
      current: undefined
    })

    const { container } = render(<Pagination />)
    expect(container.firstChild).toBeNull()
  })

  it("renders nothing when totalPages is 1", () => {
    vi.mocked(hooks.usePagination).mockReturnValue({
      totalPages: 1,
      resultsFrom: 1,
      resultsTo: 10,
      pages: [{ from: 0, page: 1, current: true }],
      prev: undefined,
      next: undefined,
      first: undefined,
      last: undefined,
      current: { from: 0, page: 1, current: true }
    })

    const { container } = render(<Pagination />)
    expect(container.firstChild).toBeNull()
  })

  it("renders pagination when totalPages is greater than 1", () => {
    vi.mocked(hooks.usePagination).mockReturnValue({
      totalPages: 3,
      resultsFrom: 1,
      resultsTo: 10,
      pages: [
        { from: 0, page: 1, current: true },
        { from: 10, page: 2, current: false },
        { from: 20, page: 3, current: false }
      ],
      prev: undefined,
      next: { from: 10, page: 2, current: false },
      first: undefined,
      last: undefined,
      current: { from: 0, page: 1, current: true }
    })

    const { container, getByText } = render(<Pagination />)

    // Should render the pagination container
    expect(container.firstChild).not.toBeNull()
    expect(container.querySelector("ul")).toBeTruthy()

    // Should render page numbers
    expect(getByText("1")).toBeTruthy()
    expect(getByText("2")).toBeTruthy()
    expect(getByText("3")).toBeTruthy()
  })

  it("renders pagination with prev/next buttons when applicable", () => {
    vi.mocked(hooks.usePagination).mockReturnValue({
      totalPages: 5,
      resultsFrom: 11,
      resultsTo: 20,
      pages: [
        { from: 0, page: 1, current: false },
        { from: 10, page: 2, current: true },
        { from: 20, page: 3, current: false }
      ],
      prev: { from: 0, page: 1, current: false },
      next: { from: 20, page: 3, current: false },
      first: undefined,
      last: { from: 40, page: 5, current: false },
      current: { from: 10, page: 2, current: true }
    })

    const { container, getByLabelText } = render(<Pagination />)

    // Should render the pagination container
    expect(container.firstChild).not.toBeNull()

    // Should render prev/next buttons
    expect(getByLabelText("Previous page")).toBeTruthy()
    expect(getByLabelText("Next page")).toBeTruthy()
    expect(getByLabelText("Last page")).toBeTruthy()
  })

  it("renders pagination with first/last buttons and ellipsis when applicable", () => {
    vi.mocked(hooks.usePagination).mockReturnValue({
      totalPages: 10,
      resultsFrom: 51,
      resultsTo: 60,
      pages: [
        { from: 50, page: 6, current: true },
        { from: 60, page: 7, current: false },
        { from: 70, page: 8, current: false }
      ],
      prev: { from: 40, page: 5, current: false },
      next: { from: 60, page: 7, current: false },
      first: { from: 0, page: 1, current: false },
      last: { from: 90, page: 10, current: false },
      current: { from: 50, page: 6, current: true }
    })

    const { container, getByLabelText, getAllByText } = render(<Pagination />)

    // Should render the pagination container
    expect(container.firstChild).not.toBeNull()

    // Should render first/last buttons
    expect(getByLabelText("First page")).toBeTruthy()
    expect(getByLabelText("Last page")).toBeTruthy()

    // Should render ellipsis (there can be multiple)
    expect(getAllByText("...")).toHaveLength(2)
  })
})
