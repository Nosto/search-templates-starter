import { render } from "@testing-library/preact"
import { describe, it, expect } from "vitest"
import Skeleton from "../../../src/elements/Skeleton/Skeleton"

describe("Skeleton", () => {
  it("renders with default props", () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton).toBeTruthy()
    expect(skeleton.className).toMatch(/container/)
  })

  it("applies custom width and height as numbers", () => {
    const { container } = render(<Skeleton width={300} height={400} />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton.style.width).toBe("300px")
    expect(skeleton.style.height).toBe("400px")
  })

  it("applies custom width and height as strings", () => {
    const { container } = render(<Skeleton width="100%" height="250px" />)
    const skeleton = container.firstChild as HTMLElement

    expect(skeleton.style.width).toBe("100%")
    expect(skeleton.style.height).toBe("250px")
  })

  it("renders skeleton elements", () => {
    const { container } = render(<Skeleton />)

    // Check for image skeleton - using data-testid or class contains
    const imageElement = container.querySelector("[class*='image']")
    expect(imageElement).toBeTruthy()

    // Check for content area
    const contentElement = container.querySelector("[class*='content']")
    expect(contentElement).toBeTruthy()

    // Check for lines
    const lineFull = container.querySelector("[class*='lineFull']")
    const linePartial = container.querySelector("[class*='linePartial']")
    expect(lineFull).toBeTruthy()
    expect(linePartial).toBeTruthy()
  })
})
