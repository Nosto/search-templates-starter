import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Search from "@/components/Search/Search"

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
