import { cleanup, render } from "@testing-library/preact"
import { afterEach, describe, it, expect } from "vitest"
import Icon from "@/elements/Icon/Icon"

afterEach(() => {
  cleanup()
})

describe("Icon", () => {
  it("should render an icon with the correct class names", () => {
    const { container } = render(<Icon name="search" />)

    const icon = container.querySelector("i")
    expect(icon).toBeTruthy()
    expect(icon?.className).toMatch(/icon/)
    expect(icon?.className).toMatch(/search/)
  })

  it("should apply custom className when provided", () => {
    const { container } = render(<Icon name="close" className="custom-class" />)

    const icon = container.querySelector("i")
    expect(icon?.className).toMatch(/custom-class/)
  })

  it("should not apply pill class when pill prop is false", () => {
    const { container } = render(<Icon name="filter" pill={false} />)

    const icon = container.querySelector("i")
    expect(icon?.className).not.toMatch(/pill/)
  })

  it("should not apply pill class when pill prop is not provided (defaults to false)", () => {
    const { container } = render(<Icon name="arrow" />)

    const icon = container.querySelector("i")
    expect(icon?.className).not.toMatch(/pill/)
  })

  it("should apply pill class when pill prop is true", () => {
    const { container } = render(<Icon name="search" pill={true} />)

    const icon = container.querySelector("i")
    expect(icon?.className).toMatch(/pill/)
  })

  it("should work with all icon names", () => {
    const iconNames = [
      "close",
      "arrow",
      "arrow-left",
      "arrow-right",
      "arrow-up",
      "arrow-down",
      "search",
      "page-prev",
      "page-next",
      "filter"
    ] as const

    iconNames.forEach(iconName => {
      const { container } = render(<Icon name={iconName} />)
      const icon = container.querySelector("i")
      expect(icon).toBeTruthy()
      expect(icon?.className).toMatch(new RegExp(iconName.replace("-", "\\-")))
    })
  })

  it("should apply both pill and custom className when both are provided", () => {
    const { container } = render(<Icon name="close" pill={true} className="custom" />)

    const icon = container.querySelector("i")
    expect(icon?.className).toMatch(/pill/)
    expect(icon?.className).toMatch(/custom/)
  })
})
