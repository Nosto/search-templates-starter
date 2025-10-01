import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import SimpleCard from "@/elements/SimpleCard/SimpleCard"

describe("SimpleCard", () => {
  it("renders custom element with required props", () => {
    const { container } = render(<SimpleCard handle="product-handle" />)
    const el = container.querySelector("nosto-simple-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-simple-card handle="product-handle"></nosto-simple-card>')
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(<SimpleCard handle="product-123" alternate brand discount rating={4.5} />)
    const el = container.querySelector("nosto-simple-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-simple-card handle="product-123" alternate="true" brand="true" discount="true" rating="4.5"></nosto-simple-card>'
    )
  })

  it("renders props with false values excluded", () => {
    const { container } = render(
      <SimpleCard handle="product-456" alternate={false} brand={false} discount rating={3} />
    )
    const el = container.querySelector("nosto-simple-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-simple-card handle="product-456" discount="true" rating="3"></nosto-simple-card>')
  })
})
