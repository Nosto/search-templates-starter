import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import DynamicCard from "@/components/DynamicCard/DynamicCard"

describe("DynamicCard", () => {
  it("renders custom element with required props", () => {
    const { container } = render(<DynamicCard handle="product-handle" />)
    const el = container.querySelector("nosto-dynamic-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-dynamic-card handle="product-handle"></nosto-dynamic-card>')
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <DynamicCard handle="h" section="main" template="card" variantId="123" placeholder lazy />
    )
    const el = container.querySelector("nosto-dynamic-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-dynamic-card variant-id="123" handle="h" section="main" template="card" placeholder="true" lazy="true"></nosto-dynamic-card>'
    )
  })

  it("renders props with false values excluded", () => {
    const { container } = render(
      <DynamicCard handle="h" section="main" template="card" variantId="123" placeholder={false} lazy={false} />
    )
    const el = container.querySelector("nosto-dynamic-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-dynamic-card variant-id="123" handle="h" section="main" template="card"></nosto-dynamic-card>'
    )
  })
})
