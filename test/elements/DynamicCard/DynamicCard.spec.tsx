import { render } from "@testing-library/preact"
import { beforeAll, describe, expect, it, vi } from "vitest"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import "@nosto/web-components"

describe("DynamicCard", () => {
  beforeAll(() => {
    // Mock IntersectionObserver
    const mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn()
    }
    // @ts-expect-error partial mock assignment
    global.IntersectionObserver = vi.fn(() => mockObserver)

    // mock fetch as it's used internally by the web component
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("<div>Mocked product markup</div>")
      } as Response)
    )
  })

  it("renders custom element with required props", () => {
    const { container } = render(<DynamicCard handle="product-handle" />)
    const el = container.querySelector("nosto-dynamic-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-dynamic-card handle="product-handle" loading=""></nosto-dynamic-card>')
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <DynamicCard handle="h" section="main" template="card" variantId="123" placeholder lazy />
    )
    const el = container.querySelector("nosto-dynamic-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-dynamic-card handle="h" section="main" template="card" variant-id="123" placeholder="" lazy=""></nosto-dynamic-card>'
    )
  })

  it("renders props with false values excluded", () => {
    const { container } = render(
      <DynamicCard handle="h" section="main" template="card" variantId="123" placeholder={false} lazy={false} />
    )
    const el = container.querySelector("nosto-dynamic-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-dynamic-card handle="h" section="main" template="card" variant-id="123" loading=""></nosto-dynamic-card>'
    )
  })
})
