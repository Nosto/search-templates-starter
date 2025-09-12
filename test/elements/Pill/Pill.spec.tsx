import { cleanup, render } from "@testing-library/preact"
import { afterEach, describe, it, expect, vi } from "vitest"
import Pill from "@/elements/Pill/Pill"

afterEach(() => {
  cleanup()
})

describe("Pill", () => {
  it("should render children content", () => {
    const { getByRole } = render(
      <Pill selected={false} onChange={() => {}}>
        Nike (42)
      </Pill>
    )

    const button = getByRole("button")
    expect(button.textContent).toBe("Nike (42)")
  })

  it("should apply selected class when selected is true", () => {
    const { getByRole } = render(
      <Pill selected={true} onChange={() => {}}>
        Adidas (28)
      </Pill>
    )

    const button = getByRole("button")
    expect(button.className).toMatch(/selected/)
  })

  it("should not apply selected class when selected is false", () => {
    const { getByRole } = render(
      <Pill selected={false} onChange={() => {}}>
        Reebok (3)
      </Pill>
    )

    const button = getByRole("button")
    expect(button.className).not.toMatch(/selected/)
  })

  it("should call onChange when clicked", () => {
    const mockOnChange = vi.fn()
    const { getByRole } = render(
      <Pill selected={false} onChange={mockOnChange}>
        Test Brand (10)
      </Pill>
    )

    const button = getByRole("button")
    button.click()

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it("should render complex children content", () => {
    const { getByRole } = render(
      <Pill selected={true} onChange={() => {}}>
        Brand: Nike
      </Pill>
    )

    const button = getByRole("button")
    expect(button.textContent).toBe("Brand: Nike")
  })
})
