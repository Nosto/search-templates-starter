import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render } from "@testing-library/preact"
import ViewTransition from "@/elements/ViewTransition/ViewTransition"

describe("ViewTransition", () => {
  let mockStartViewTransition: ReturnType<typeof vi.fn>
  let originalDocument: Document

  beforeEach(() => {
    mockStartViewTransition = vi.fn()
    originalDocument = global.document

    // Mock document.startViewTransition
    Object.defineProperty(global.document, "startViewTransition", {
      value: mockStartViewTransition,
      writable: true,
      configurable: true
    })
  })

  afterEach(() => {
    global.document = originalDocument
    vi.clearAllMocks()
  })

  it("renders children correctly", () => {
    const { getByText } = render(
      <ViewTransition>
        <div>Test content</div>
      </ViewTransition>
    )

    expect(getByText("Test content")).toBeDefined()
  })

  it("applies default view-transition-name when no name prop provided", () => {
    const { getByText } = render(
      <ViewTransition>
        <div>Test content</div>
      </ViewTransition>
    )

    const container = getByText("Test content").parentElement
    expect(container?.style.viewTransitionName).toBe("view-transition")
  })

  it("applies custom view-transition-name when name prop provided", () => {
    const { getByText } = render(
      <ViewTransition name="custom-name">
        <div>Test content</div>
      </ViewTransition>
    )

    const container = getByText("Test content").parentElement
    expect(container?.style.viewTransitionName).toBe("custom-name")
  })

  it("passes through additional props to container div", () => {
    const { getByTestId } = render(
      <ViewTransition data-testid="view-transition" id="test-id">
        <div>Test content</div>
      </ViewTransition>
    )

    const container = getByTestId("view-transition")
    expect(container.id).toBe("test-id")
  })

  it("combines custom className with default styles", () => {
    const { getByText } = render(
      <ViewTransition className="custom-class">
        <div>Test content</div>
      </ViewTransition>
    )

    const container = getByText("Test content").parentElement
    expect(container?.className).toMatch(/custom-class/)
  })

  it("calls startViewTransition when children change and API is supported", () => {
    mockStartViewTransition.mockReturnValue({
      skipTransition: vi.fn()
    })

    const { rerender } = render(
      <ViewTransition>
        <div>Initial content</div>
      </ViewTransition>
    )

    // Initial render should not trigger transition
    expect(mockStartViewTransition).not.toHaveBeenCalled()

    // Re-render with new children should trigger transition
    rerender(
      <ViewTransition>
        <div>Updated content</div>
      </ViewTransition>
    )

    expect(mockStartViewTransition).toHaveBeenCalledTimes(1)
    expect(mockStartViewTransition).toHaveBeenCalledWith(expect.any(Function))
  })

  it("does not call startViewTransition when children don't change", () => {
    const content = <div>Consistent content</div>

    const { rerender } = render(<ViewTransition>{content}</ViewTransition>)

    // Re-render with same children should not trigger transition
    rerender(<ViewTransition>{content}</ViewTransition>)

    expect(mockStartViewTransition).not.toHaveBeenCalled()
  })

  it("does not call startViewTransition when API is not supported", () => {
    // Remove startViewTransition from document
    Object.defineProperty(global.document, "startViewTransition", {
      value: undefined,
      writable: true,
      configurable: true
    })

    const { rerender } = render(
      <ViewTransition>
        <div>Initial content</div>
      </ViewTransition>
    )

    rerender(
      <ViewTransition>
        <div>Updated content</div>
      </ViewTransition>
    )

    expect(mockStartViewTransition).not.toHaveBeenCalled()
  })

  it("updates view-transition-name when name prop changes", () => {
    const { rerender, getByText } = render(
      <ViewTransition name="initial-name">
        <div>Test content</div>
      </ViewTransition>
    )

    const container = getByText("Test content").parentElement
    expect(container?.style.viewTransitionName).toBe("initial-name")

    rerender(
      <ViewTransition name="updated-name">
        <div>Test content</div>
      </ViewTransition>
    )

    expect(container?.style.viewTransitionName).toBe("updated-name")
  })

  it("handles cleanup when component unmounts during transition", () => {
    const mockSkipTransition = vi.fn()
    mockStartViewTransition.mockReturnValue({
      skipTransition: mockSkipTransition
    })

    const { rerender, unmount } = render(
      <ViewTransition>
        <div>Initial content</div>
      </ViewTransition>
    )

    // Clear the mock to ensure initial render doesn't count
    mockStartViewTransition.mockClear()

    // Trigger transition
    rerender(
      <ViewTransition>
        <div>Updated content</div>
      </ViewTransition>
    )

    // Unmount component
    unmount()

    expect(mockStartViewTransition).toHaveBeenCalledTimes(1)
  })

  it("handles transition without skipTransition method", () => {
    // Some implementations might not have skipTransition
    mockStartViewTransition.mockReturnValue({})

    const { rerender, unmount } = render(
      <ViewTransition>
        <div>Initial content</div>
      </ViewTransition>
    )

    rerender(
      <ViewTransition>
        <div>Updated content</div>
      </ViewTransition>
    )

    // Should not throw when unmounting
    expect(() => unmount()).not.toThrow()
  })

  it("renders with multiple children", () => {
    const { getByText } = render(
      <ViewTransition>
        <div>First child</div>
        <span>Second child</span>
      </ViewTransition>
    )

    expect(getByText("First child")).toBeDefined()
    expect(getByText("Second child")).toBeDefined()
  })

  it("handles string children", () => {
    const { getByText } = render(<ViewTransition>Just a string</ViewTransition>)

    expect(getByText("Just a string")).toBeDefined()
  })

  it("handles null/undefined children gracefully", () => {
    expect(() => {
      render(<ViewTransition>{null}</ViewTransition>)
    }).not.toThrow()

    expect(() => {
      render(<ViewTransition>{undefined}</ViewTransition>)
    }).not.toThrow()
  })
})
