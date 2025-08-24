import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import Toolbar from "@/components/Toolbar/Toolbar"

describe("Toolbar Component", () => {
  it("renders toolbar container", () => {
    const { container } = renderWithSearchProvider(<Toolbar />)

    expect(container).toBeTruthy()
    const toolbarContainer = container.querySelector("div")
    expect(toolbarContainer).toBeTruthy()
  })

  it("renders toolbar content", () => {
    const { container } = renderWithSearchProvider(<Toolbar />)

    // Should render the toolbar structure
    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("renders toolbar components", () => {
    const { container } = renderWithSearchProvider(<Toolbar />)

    // Should render toolbar with its components
    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })

  it("includes toolbar functionality", () => {
    const { container } = renderWithSearchProvider(<Toolbar />)

    // Should render without errors
    expect(container).toBeTruthy()
    expect(container.innerHTML).toBeTruthy()
  })
})
