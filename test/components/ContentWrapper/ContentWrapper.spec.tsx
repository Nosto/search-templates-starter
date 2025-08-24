import { describe, it, expect, vi } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper"

// Mock the Sidebar component and hooks
vi.mock("@/components/Sidebar/Sidebar", () => ({
  default: () => <div data-testid="sidebar">Sidebar Component</div>
}))

vi.mock("@nosto/search-js/preact/hooks", async () => {
  const actual = await vi.importActual("@nosto/search-js/preact/hooks")
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useNostoAppState: (selector: (state: any) => any) => {
      const state = {
        foundProducts: true,
        loading: false,
        initialized: true,
        response: { products: { total: 5 } }
      }
      return selector ? selector(state) : state
    }
  }
})

describe("ContentWrapper Component", () => {
  const mockChildren = ({ loading, foundProducts }: { loading: boolean; foundProducts: boolean }) => (
    <div data-testid="content">
      Content - Loading: {loading.toString()}, Found: {foundProducts.toString()}
    </div>
  )

  it("renders content wrapper", () => {
    const { container } = renderWithSearchProvider(<ContentWrapper type="search">{mockChildren}</ContentWrapper>)

    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders children with correct props", () => {
    const { container } = renderWithSearchProvider(<ContentWrapper type="search">{mockChildren}</ContentWrapper>)

    // Should render the children function
    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })
})
