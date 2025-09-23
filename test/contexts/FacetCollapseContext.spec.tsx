import { render, screen, fireEvent } from "@testing-library/preact"
import { describe, it, expect } from "vitest"
import { FacetCollapseProvider, useFacetCollapse } from "@/contexts/FacetCollapseContext"

function TestFacetCollapseComponent() {
  const { shouldCollapse, collapseAll, resetCollapseFlag } = useFacetCollapse()

  return (
    <>
      <div data-testid="collapse-status">{shouldCollapse ? "should-collapse" : "normal"}</div>
      <button data-testid="collapse-all-button" onClick={collapseAll}>
        Collapse All
      </button>
      <button data-testid="reset-flag-button" onClick={resetCollapseFlag}>
        Reset Flag
      </button>
    </>
  )
}

describe("FacetCollapseContext", () => {
  it("should provide default normal state", () => {
    render(
      <FacetCollapseProvider>
        <TestFacetCollapseComponent />
      </FacetCollapseProvider>
    )

    expect(screen.getByTestId("collapse-status").textContent).toBe("normal")
  })

  it("should set collapse flag when collapseAll is called", () => {
    render(
      <FacetCollapseProvider>
        <TestFacetCollapseComponent />
      </FacetCollapseProvider>
    )

    const collapseAllButton = screen.getByTestId("collapse-all-button")
    const status = screen.getByTestId("collapse-status")

    expect(status.textContent).toBe("normal")

    fireEvent.click(collapseAllButton)
    expect(status.textContent).toBe("should-collapse")
  })

  it("should reset collapse flag when resetCollapseFlag is called", () => {
    render(
      <FacetCollapseProvider>
        <TestFacetCollapseComponent />
      </FacetCollapseProvider>
    )

    const collapseAllButton = screen.getByTestId("collapse-all-button")
    const resetFlagButton = screen.getByTestId("reset-flag-button")
    const status = screen.getByTestId("collapse-status")

    // Set collapse flag
    fireEvent.click(collapseAllButton)
    expect(status.textContent).toBe("should-collapse")

    // Reset flag
    fireEvent.click(resetFlagButton)
    expect(status.textContent).toBe("normal")
  })

  it("should throw error when used outside provider", () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = () => {}

    expect(() => {
      render(<TestFacetCollapseComponent />)
    }).toThrow("useFacetCollapse must be used within a FacetCollapseProvider")

    console.error = originalError
  })
})
