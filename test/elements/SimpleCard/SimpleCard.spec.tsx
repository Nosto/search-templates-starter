import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import SimpleCard from "@/elements/SimpleCard/SimpleCard"

describe("SimpleCard", () => {
  it("renders custom element with required handle prop", () => {
    const { container } = render(<SimpleCard handle="product-handle" />)
    const el = container.querySelector("nosto-simple-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-simple-card handle="product-handle"></nosto-simple-card>')
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <SimpleCard
        handle="product-handle"
        alternate
        brand
        discount
        rating={4.5}
        sizes="(min-width: 1024px) 25vw, 50vw"
      />
    )
    const el = container.querySelector("nosto-simple-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-simple-card handle="product-handle" alternate="true" brand="true" discount="true" rating="4.5" sizes="(min-width: 1024px) 25vw, 50vw"></nosto-simple-card>'
    )
  })
})
