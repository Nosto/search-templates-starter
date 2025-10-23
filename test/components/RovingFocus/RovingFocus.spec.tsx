import { render } from "@testing-library/preact"
import { describe, it, expect } from "vitest"
import { RovingFocusGroup, RovingFocusItem } from "@/components/RovingFocus"

describe("RovingFocus", () => {
  it("renders RovingFocusGroup with children", () => {
    const { getByText } = render(
      <RovingFocusGroup>
        <div>Child content</div>
      </RovingFocusGroup>
    )
    expect(getByText("Child content")).toBeTruthy()
  })

  it("sets role='group' on RovingFocusGroup container", () => {
    const { container } = render(
      <RovingFocusGroup>
        <div>Content</div>
      </RovingFocusGroup>
    )
    expect(container.querySelector('[role="group"]')).toBeTruthy()
  })

  it("renders RovingFocusItem with children", () => {
    const { getByText } = render(
      <RovingFocusGroup>
        <RovingFocusItem>
          <span>Item content</span>
        </RovingFocusItem>
      </RovingFocusGroup>
    )
    expect(getByText("Item content")).toBeTruthy()
  })

  it("sets role='button' on RovingFocusItem", () => {
    const { container } = render(
      <RovingFocusGroup>
        <RovingFocusItem>
          <span>Item</span>
        </RovingFocusItem>
      </RovingFocusGroup>
    )
    expect(container.querySelector('[role="button"]')).toBeTruthy()
  })

  it("throws error when RovingFocusItem used outside RovingFocusGroup", () => {
    expect(() => {
      render(<RovingFocusItem>Item</RovingFocusItem>)
    }).toThrow("useRovingFocus must be used within a RovingFocusGroup")
  })
})
