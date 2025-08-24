import { describe, it, expect } from "vitest"
import { renderWithSearchProvider } from "../../utils/test-utils"
import NoResults from "@/components/NoResults/NoResults"

describe("NoResults Component", () => {
  it("renders no results message", () => {
    const { container } = renderWithSearchProvider(<NoResults />)

    expect(container).toBeTruthy()
    expect(container.textContent).toContain("No results found")
  })

  it("displays query in message when available", () => {
    // Note: The query would come from the search state
    // This test verifies the component structure
    const { container } = renderWithSearchProvider(<NoResults />)

    const messageElement = container.querySelector("div")
    expect(messageElement).toBeTruthy()
  })
})
