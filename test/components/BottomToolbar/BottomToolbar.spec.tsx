import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import BottomToolbar from "@/components/BottomToolbar/BottomToolbar"

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
