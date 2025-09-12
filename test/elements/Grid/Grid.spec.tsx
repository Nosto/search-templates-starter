import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/preact"
import Grid from "@/elements/Grid/Grid"

afterEach(() => {
  cleanup()
})

describe("Grid component", () => {
  it("renders children correctly", () => {
    const { getByTestId, getByText } = render(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect(grid).toBeDefined()
    expect(getByText("Item 1")).toBeDefined()
    expect(getByText("Item 2")).toBeDefined()
  })

  it("applies grid CSS class", () => {
    const { getByTestId } = render(
      <Grid data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect(grid.className).toMatch(/grid/)
  })

  it("applies custom className", () => {
    const { getByTestId } = render(
      <Grid className="custom-class" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect(grid.className).toContain("custom-class")
  })

  it("sets custom CSS properties for columns", () => {
    const { getByTestId } = render(
      <Grid columns={3} data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.getPropertyValue("--ns-grid-columns")).toBe("repeat(3, 1fr)")
  })

  it("sets custom CSS properties for gap", () => {
    const { getByTestId } = render(
      <Grid gap="large" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.getPropertyValue("--ns-grid-gap")).toBe("var(--ns-grid-gap-large)")
  })

  it("sets custom CSS properties for alignment", () => {
    const { getByTestId } = render(
      <Grid alignItems="center" justifyItems="end" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.getPropertyValue("--ns-grid-align-items")).toBe("center")
    expect((grid as HTMLElement).style.getPropertyValue("--ns-grid-justify-items")).toBe("end")
  })

  it("handles auto-fit columns", () => {
    const { getByTestId } = render(
      <Grid columns="auto-fit" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.getPropertyValue("--ns-grid-columns")).toBe(
      "repeat(auto-fit, minmax(200px, 1fr))"
    )
  })

  it("handles custom gap value", () => {
    const { getByTestId } = render(
      <Grid gap="2rem" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.getPropertyValue("--ns-grid-gap")).toBe("2rem")
  })
})
