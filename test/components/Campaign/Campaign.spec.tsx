import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import Campaign from "@/components/Campaign/Campaign"

describe("Campaign", () => {
  it("renders custom element with required props", () => {
    const { container } = render(<Campaign placement="home-top" />)
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-campaign placement="home-top"></nosto-campaign>')
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <Campaign placement="home-top" productId="456" variantId="789" template="tpl-2" init="true" lazy />
    )
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-campaign product-id="456" variant-id="789" placement="home-top" template="tpl-2" init="true" lazy="true"></nosto-campaign>'
    )
  })

  it("renders props with false values excluded", () => {
    const { container } = render(
      <Campaign placement="home-top" productId="456" variantId="789" template="tpl-2" init="false" lazy={false} />
    )
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-campaign product-id="456" variant-id="789" placement="home-top" template="tpl-2" init="false"></nosto-campaign>'
    )
  })
})
