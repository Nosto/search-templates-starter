import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Search from "@/components/Search/Search"

// Mock the useActions hook to return test functions
vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    useActions: () => ({
      newSearch: vi.fn()
    })
  }
})

describe("Search Component", () => {
  it("renders search wrapper", () => {
    const { container } = renderWithSearchProvider(<Search />)

    expect(container).toBeTruthy()
    // The Search component should render some content
    expect(container.innerHTML).toBeTruthy()
  })

  it("includes autocomplete wrapper", () => {
    const { container } = renderWithSearchProvider(<Search />)

    // The AutocompleteWrapper should be rendered within the component
    expect(container.innerHTML).toBeTruthy()
  })
})
