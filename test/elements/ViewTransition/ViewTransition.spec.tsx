import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render } from "@testing-library/preact"
import ViewTransition from "@/elements/ViewTransition/ViewTransition"
import * as viewTransitionUtils from "@/utils/viewTransition"

describe("ViewTransition", () => {
  let mockStartViewTransition: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockStartViewTransition = vi.fn()
    vi.spyOn(viewTransitionUtils, "startViewTransition").mockImplementation(mockStartViewTransition)
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
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

  it("calls startViewTransition when children change", () => {
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
