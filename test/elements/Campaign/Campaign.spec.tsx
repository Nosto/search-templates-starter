import { render } from "@testing-library/preact"
import { beforeAll, describe, expect, it } from "vitest"
import Campaign from "@/elements/Campaign/Campaign"
import "@nosto/web-components"

describe("Campaign", () => {
  beforeAll(() => {
    // Mock IntersectionObserver if Campaign uses it internally
    globalThis.IntersectionObserver = class {
      constructor() {}
      disconnect() {}
      observe() {}
      unobserve() {}
    } as unknown as typeof IntersectionObserver
  })

  it("renders custom element with required props", () => {
    const { container } = render(<Campaign placement="home-top" />)
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-campaign placement="home-top" loading=""></nosto-campaign>')
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <Campaign placement="home-top" productId="456" variantId="789" template="tpl-2" init="true" lazy />
    )
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-campaign placement="home-top" product-id="456" variant-id="789" template="tpl-2" init="true" lazy=""></nosto-campaign>'
    )
  })

  it("renders props with false values excluded", () => {
    const { container } = render(
      <Campaign placement="home-top" productId="456" variantId="789" template="tpl-2" init="false" lazy={false} />
    )
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-campaign placement="home-top" product-id="456" variant-id="789" template="tpl-2" init="false"></nosto-campaign>'
    )
  })

  it("renders children content", () => {
    const { container } = render(
      <Campaign placement="home-top">
        <div>Custom template content</div>
      </Campaign>
    )
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-campaign placement="home-top" loading=""><div>Custom template content</div></nosto-campaign>'
    )
  })

  it("renders with id prop", () => {
    const { container } = render(<Campaign id="campaign-123" />)
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-campaign id="campaign-123" loading=""></nosto-campaign>')
  })

  it("renders with both id and placement props", () => {
    const { container } = render(<Campaign id="campaign-123" placement="home-top" />)
    const el = container.querySelector("nosto-campaign") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-campaign id="campaign-123" placement="home-top" loading=""></nosto-campaign>')
  })
})
