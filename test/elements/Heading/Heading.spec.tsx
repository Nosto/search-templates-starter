import { cleanup, render } from "@testing-library/preact"
import { afterEach, describe, expect, it } from "vitest"
import Heading from "@/elements/Heading/Heading"

afterEach(() => {
  cleanup()
})

describe("Heading", () => {
  it("renders as h3 by default", () => {
    const { container } = render(<Heading>Test Heading</Heading>)
    const headingEl = container.querySelector("h3")
    expect(headingEl).toBeTruthy()
    expect(headingEl?.textContent).toBe("Test Heading")
  })

  it("renders as specified heading level", () => {
    const { container } = render(<Heading as="h1">Test H1</Heading>)
    const headingEl = container.querySelector("h1")
    expect(headingEl).toBeTruthy()
    expect(headingEl?.textContent).toBe("Test H1")
  })

  it("applies correct CSS class", () => {
    const { container } = render(<Heading>Test</Heading>)
    const headingEl = container.querySelector("h3")
    expect(headingEl?.className).toBeDefined()
    expect(headingEl?.className).toMatch(/heading/)
  })

  it("works with all heading levels", () => {
    const levels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

    levels.forEach(level => {
      const testText = `Test ${level}`
      const { container } = render(<Heading as={level}>{testText}</Heading>)
      const headingEl = container.querySelector(level)
      expect(headingEl).toBeTruthy()
      expect(headingEl?.textContent).toBe(testText)
    })
  })
})
