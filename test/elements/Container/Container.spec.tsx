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

  it("applies inline padding style when padding prop is provided", () => {
    const { container } = render(<Container padding="3">Test</Container>)
    const containerEl = container.querySelector("div")
    expect(containerEl?.style.padding).toBe("var(--ns-space-3)")
  })

  it("applies all padding options correctly as inline styles", () => {
    const paddingOptions = ["05", "1", "2", "3", "4", "5", "10", "16"] as const

    paddingOptions.forEach(padding => {
      const { container } = render(<Container padding={padding}>Test</Container>)
      const containerEl = container.querySelector("div")
      expect(containerEl?.style.padding).toBe(`var(--ns-space-${padding})`)
      cleanup()
    })
  })

  it("applies custom className along with container class", () => {
    const { container } = render(
      <Container className="custom-class" padding="2">
        Test
      </Container>
    )
    const containerEl = container.querySelector("div")
    expect(containerEl?.className).toMatch(/container/)
    expect(containerEl?.className).toMatch(/custom-class/)
    expect(containerEl?.style.padding).toBe("var(--ns-space-2)")
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
    expect(containerEl?.style.padding).toBe("")
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

  it("merges custom style prop with padding styles", () => {
    const { container } = render(
      <Container padding="2" style={{ color: "red", margin: "10px" }}>
        Test
      </Container>
    )
    const containerEl = container.querySelector("div")
    expect(containerEl?.style.padding).toBe("var(--ns-space-2)")
    expect(containerEl?.style.color).toBe("red")
    expect(containerEl?.style.margin).toBe("10px")
  })
})
