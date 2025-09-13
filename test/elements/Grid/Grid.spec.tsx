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

  it("applies display: grid style", () => {
    const { getByTestId } = render(
      <Grid data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.display).toBe("grid")
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

  it("sets direct CSS properties for columns", () => {
    const { getByTestId } = render(
      <Grid columns={3} data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.gridTemplateColumns).toBe("repeat(3, 1fr)")
  })

  it("sets direct CSS properties for gap", () => {
    const { getByTestId } = render(
      <Grid gap="large" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.gap).toBe("2rem")
  })

  it("sets direct CSS properties for alignment", () => {
    const { getByTestId } = render(
      <Grid alignItems="center" justifyItems="end" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.alignItems).toBe("center")
    expect((grid as HTMLElement).style.justifyItems).toBe("end")
  })

  it("handles auto-fit columns", () => {
    const { getByTestId } = render(
      <Grid columns="auto-fit" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.gridTemplateColumns).toBe("repeat(auto-fit, minmax(200px, 1fr))")
  })

  it("handles custom gap value", () => {
    const { getByTestId } = render(
      <Grid gap="2rem" data-testid="grid">
        <div>Content</div>
      </Grid>
    )

    const grid = getByTestId("grid")
    expect((grid as HTMLElement).style.gap).toBe("2rem")
  })
})
