import { render } from "@testing-library/preact"
import { beforeAll, beforeEach, describe, expect, it } from "vitest"
import SimpleCard from "@/elements/SimpleCard/SimpleCard"
import "@nosto/web-components"
import { addHandlers } from "../../msw.setup"
import { http, HttpResponse } from "msw"
import { MockIntersectionObserver } from "../../mocks/MockIntersectionObserver"

describe("SimpleCard", () => {
  beforeAll(() => {
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
  })

  beforeEach(() => {
    addHandlers(
      http.get("/products/:handle.js", () => {
        return HttpResponse.json({
          id: 123,
          title: "Test Product",
          handle: "test-product",
          price: 1000,
          compare_at_price: 1200
        })
      })
    )
  })

  it("renders custom element with required props", () => {
    const { container } = render(<SimpleCard handle="product-handle" />)
    const el = container.querySelector("nosto-simple-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.tagName.toLowerCase()).toBe("nosto-simple-card")
    expect(el.getAttribute("handle")).toBe("product-handle")
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <SimpleCard handle="test-handle" alternate brand discount rating={4.5} sizes="100vw" />
    )
    const el = container.querySelector("nosto-simple-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.tagName.toLowerCase()).toBe("nosto-simple-card")
    expect(el.getAttribute("handle")).toBe("test-handle")
    expect(el.hasAttribute("alternate")).toBe(true)
    expect(el.getAttribute("alternate")).toBe("")
    expect(el.hasAttribute("brand")).toBe(true)
    expect(el.getAttribute("brand")).toBe("")
    expect(el.hasAttribute("discount")).toBe(true)
    expect(el.getAttribute("discount")).toBe("")
    expect(el.getAttribute("rating")).toBe("4.5")
    expect(el.getAttribute("sizes")).toBe("100vw")
  })

  it("renders props with false values excluded", () => {
    const { container } = render(<SimpleCard handle="test-handle" alternate={false} brand={false} discount={false} />)
    const el = container.querySelector("nosto-simple-card") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.tagName.toLowerCase()).toBe("nosto-simple-card")
    expect(el.getAttribute("handle")).toBe("test-handle")
    expect(el.hasAttribute("alternate")).toBe(false)
    expect(el.hasAttribute("brand")).toBe(false)
    expect(el.hasAttribute("discount")).toBe(false)
  })
})
