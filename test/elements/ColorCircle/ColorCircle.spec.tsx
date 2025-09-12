import { cleanup, render } from "@testing-library/preact"
import { afterEach, describe, it, expect } from "vitest"
import ColorCircle from "@/elements/ColorCircle/ColorCircle"

afterEach(() => {
  cleanup()
})

describe("ColorCircle", () => {
  it("should render with the correct background color", () => {
    const { container } = render(<ColorCircle color="red" />)

    const colorCircle = container.firstChild as HTMLElement
    expect(colorCircle).toBeTruthy()
    expect(colorCircle.style.backgroundColor).toBe("red")
  })

  it("should have correct aria-label", () => {
    const { container } = render(<ColorCircle color="blue" />)

    const colorCircle = container.firstChild as HTMLElement
    expect(colorCircle.getAttribute("aria-label")).toBe("Color: blue")
  })

  it("should apply additional className when provided", () => {
    const { container } = render(<ColorCircle color="green" className="custom-class" />)

    const colorCircle = container.firstChild as HTMLElement
    expect(colorCircle.className).toContain("custom-class")
  })

  it("should work with hex color values", () => {
    const { container } = render(<ColorCircle color="#ff0000" />)

    const colorCircle = container.firstChild as HTMLElement
    expect(colorCircle.style.backgroundColor).toBe("rgb(255, 0, 0)")
    expect(colorCircle.getAttribute("aria-label")).toBe("Color: #ff0000")
  })

  it("should work with RGB color values", () => {
    const { container } = render(<ColorCircle color="rgb(255, 0, 0)" />)

    const colorCircle = container.firstChild as HTMLElement
    expect(colorCircle.style.backgroundColor).toBe("rgb(255, 0, 0)")
    expect(colorCircle.getAttribute("aria-label")).toBe("Color: rgb(255, 0, 0)")
  })
})
