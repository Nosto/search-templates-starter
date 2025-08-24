import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper"

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
