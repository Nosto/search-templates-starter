import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import { ErrorBoundary } from "@nosto/search-js/preact/common"

describe("ErrorBoundary Integration", () => {
  it("renders children when no error occurs", () => {
    const TestComponent = () => <div>Test content</div>

    const { getByText } = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    )

    expect(getByText("Test content")).toBeTruthy()
  })

  it("can be imported from search-js package", () => {
    expect(ErrorBoundary).toBeDefined()
    expect(typeof ErrorBoundary).toBe("function")
  })
})
