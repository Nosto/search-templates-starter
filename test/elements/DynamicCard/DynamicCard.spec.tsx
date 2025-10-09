import { render } from "@testing-library/preact"
import { beforeAll, beforeEach, describe, expect, it } from "vitest"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import "@nosto/web-components"
import { addHandlers } from "../../msw.setup"
import { http, HttpResponse } from "msw"
import { MockIntersectionObserver } from "../../mocks/MockIntersectionObserver"

describe("DynamicCard", () => {
  beforeAll(() => {
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
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
    expect(el.tagName.toLowerCase()).toBe("nosto-dynamic-card")
    expect(el.getAttribute("handle")).toBe("product-handle")
    expect(el.hasAttribute("loading")).toBe(true)
    expect(el.getAttribute("loading")).toBe("")
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <DynamicCard handle="h" section="main" template="card" variantId="123" placeholder lazy />
    )
    const el = container.querySelector("nosto-dynamic-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.tagName.toLowerCase()).toBe("nosto-dynamic-card")
    expect(el.getAttribute("handle")).toBe("h")
    expect(el.getAttribute("section")).toBe("main")
    expect(el.getAttribute("template")).toBe("card")
    expect(el.getAttribute("variant-id")).toBe("123")
    expect(el.hasAttribute("placeholder")).toBe(true)
    expect(el.getAttribute("placeholder")).toBe("")
    expect(el.hasAttribute("lazy")).toBe(true)
    expect(el.getAttribute("lazy")).toBe("")
  })

  it("renders props with false values excluded", () => {
    const { container } = render(
      <DynamicCard handle="h" section="main" template="card" variantId="123" placeholder={false} lazy={false} />
    )
    const el = container.querySelector("nosto-dynamic-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.tagName.toLowerCase()).toBe("nosto-dynamic-card")
    expect(el.getAttribute("handle")).toBe("h")
    expect(el.getAttribute("section")).toBe("main")
    expect(el.getAttribute("template")).toBe("card")
    expect(el.getAttribute("variant-id")).toBe("123")
    expect(el.hasAttribute("placeholder")).toBe(false)
    expect(el.hasAttribute("lazy")).toBe(false)
  })
})
