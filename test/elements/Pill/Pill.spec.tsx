import { cleanup, render } from "@testing-library/preact"
import { afterEach, describe, it, expect, vi } from "vitest"
import Pill from "@/elements/Pill/Pill"

afterEach(() => {
  cleanup()
})

describe("Pill", () => {
  it("should render children content", () => {
    const { getByRole } = render(
      <Pill selected={false} onClick={() => {}}>
        Nike (42)
      </Pill>
    )

    const button = getByRole("button")
    expect(button.textContent).toBe("Nike (42)")
  })

  it("should apply selected class when selected is true", () => {
    const { getByRole } = render(
      <Pill selected={true} onClick={() => {}}>
        Adidas (28)
      </Pill>
    )

    const button = getByRole("button")
    expect(button.className).toMatch(/selected/)
  })

  it("should not apply selected class when selected is false", () => {
    const { getByRole } = render(
      <Pill selected={false} onClick={() => {}}>
        Reebok (3)
      </Pill>
    )

    const button = getByRole("button")
    expect(button.className).not.toMatch(/selected/)
  })

  it("should call onClick when clicked", () => {
    const mockOnClick = vi.fn()
    const { getByRole } = render(
      <Pill selected={false} onClick={mockOnClick}>
        Test Brand (10)
      </Pill>
    )

    const button = getByRole("button")
    button.click()

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("should render complex children content", () => {
    const { getByRole } = render(
      <Pill selected={true} onClick={() => {}}>
        Brand: Nike
      </Pill>
    )

    const button = getByRole("button")
    expect(button.textContent).toBe("Brand: Nike")
  })

  it("should default to unselected when selected prop is not provided", () => {
    const { getByRole } = render(<Pill onClick={() => {}}>Default Pill</Pill>)

    const button = getByRole("button")
    expect(button.className).not.toMatch(/selected/)
  })

  it("should work without onClick prop", () => {
    const { getByRole } = render(<Pill>No Click Handler</Pill>)

    const button = getByRole("button")
    expect(button.textContent).toBe("No Click Handler")
  })
})
