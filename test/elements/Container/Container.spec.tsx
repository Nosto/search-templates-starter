import { cleanup, render } from "@testing-library/preact"
import { afterEach, describe, expect, it } from "vitest"
import Container from "@/elements/Container/Container"

afterEach(() => {
  cleanup()
})

describe("Container", () => {
  it("renders children correctly", () => {
    const { container } = render(<Container>Test content</Container>)
    expect(container.textContent).toBe("Test content")
  })

  it("applies default container class", () => {
    const { container } = render(<Container>Test</Container>)
    const containerEl = container.querySelector("div")
    expect(containerEl?.className).toMatch(/container/)
  })

  it("applies padding class when padding prop is provided", () => {
    const { container } = render(<Container padding="3">Test</Container>)
    const containerEl = container.querySelector("div")
    expect(containerEl?.className).toMatch(/padding-3/)
  })

  it("applies multiple padding options correctly", () => {
    const paddingOptions = ["05", "1", "2", "3", "4", "5", "10", "16"] as const

    paddingOptions.forEach(padding => {
      const { container } = render(<Container padding={padding}>Test</Container>)
      const containerEl = container.querySelector("div")
      expect(containerEl?.className).toMatch(new RegExp(`padding-${padding}`))
      cleanup()
    })
  })

  it("applies custom className along with container classes", () => {
    const { container } = render(
      <Container className="custom-class" padding="2">
        Test
      </Container>
    )
    const containerEl = container.querySelector("div")
    expect(containerEl?.className).toMatch(/container/)
    expect(containerEl?.className).toMatch(/padding-2/)
    expect(containerEl?.className).toMatch(/custom-class/)
  })

  it("passes through additional div props", () => {
    const { container } = render(
      <Container id="test-id" data-testid="container">
        Test
      </Container>
    )
    const containerEl = container.querySelector("div")
    expect(containerEl?.id).toBe("test-id")
    expect(containerEl?.getAttribute("data-testid")).toBe("container")
  })

  it("works without padding prop", () => {
    const { container } = render(<Container>No padding</Container>)
    const containerEl = container.querySelector("div")
    expect(containerEl?.className).toMatch(/container/)
    expect(containerEl?.className).not.toMatch(/padding-/)
  })

  it("renders nested elements correctly", () => {
    const { container } = render(
      <Container padding="4">
        <h1>Title</h1>
        <p>Paragraph</p>
      </Container>
    )
    expect(container.querySelector("h1")?.textContent).toBe("Title")
    expect(container.querySelector("p")?.textContent).toBe("Paragraph")
  })
})
