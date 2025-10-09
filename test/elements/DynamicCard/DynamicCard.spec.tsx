import { render } from "@testing-library/preact"
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import "@nosto/web-components"
import { addHandlers } from "../../msw.setup"
import { http, HttpResponse } from "msw"

describe("DynamicCard", () => {
  beforeAll(() => {
    // Mock IntersectionObserver
    const mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn()
    }
    // @ts-expect-error partial mock assignment
    global.IntersectionObserver = vi.fn(() => mockObserver)
  })

  beforeEach(() => {
    addHandlers(
      http.get("/products/:handle", () => {
        return HttpResponse.text("<div>Mocked product markup</div>")
      })
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
