import { cleanup, render } from "@testing-library/preact"
import { afterEach, describe, expect, it, vi } from "vitest"
import Product from "@/components/Autocomplete/Product/Product"

// Mock the AutocompleteElement since it requires Nosto context
vi.mock("@nosto/search-js/preact/autocomplete", () => ({
  AutocompleteElement: vi.fn(({ children, as = "div", componentProps = {} }) => {
    if (as === "a") {
      return <a {...componentProps}>{children}</a>
    }
    return <div {...componentProps}>{children}</div>
  })
}))

afterEach(() => {
  cleanup()
})

describe("Autocomplete Product", () => {
  const mockHit = {
    productId: "123",
    name: "Test Product",
    url: "https://example.com/product/123",
    imageUrl: "https://example.com/image.jpg",
    priceText: "$99.99",
    brand: "Test Brand",
    listPrice: 120,
    price: 99.99,
    listPriceText: "$120.00"
  }

  it("renders as anchor element with correct href and accessibility", () => {
    const { container } = render(<Product hit={mockHit} />)
    const anchor = container.querySelector("a") as HTMLAnchorElement

    expect(anchor).toBeTruthy()
    expect(anchor.href).toBe("https://example.com/product/123")
    expect(anchor.getAttribute("aria-label")).toBe("Product Test Product")
  })

  it("renders product information correctly", () => {
    const { container } = render(<Product hit={mockHit} />)

    expect(container.textContent).toContain("Test Product")
    expect(container.textContent).toContain("Test Brand")
    expect(container.textContent).toContain("$99.99")
    expect(container.textContent).toContain("$120.00")
  })

  it("renders without brand when not provided", () => {
    const hitWithoutBrand = { ...mockHit, brand: undefined }
    const { container } = render(<Product hit={hitWithoutBrand} />)

    expect(container.textContent).toContain("Test Product")
    expect(container.textContent).not.toContain("Test Brand")
  })

  it("renders strikethrough price when list price is higher", () => {
    const { container } = render(<Product hit={mockHit} />)
    const strikedPrice = container.querySelector('[class*="strikedPrice"]')

    expect(strikedPrice).toBeTruthy()
    expect(strikedPrice?.textContent).toBe("$120.00")
  })

  it("does not render strikethrough price when list price equals or is lower than price", () => {
    const hitWithSamePrice = { ...mockHit, listPrice: 99.99 }
    const { container } = render(<Product hit={hitWithSamePrice} />)
    const strikedPrice = container.querySelector('[class*="strikedPrice"]')

    expect(strikedPrice).toBeFalsy()
  })

  it("has proper CSS classes applied", () => {
    const { container } = render(<Product hit={mockHit} />)
    const anchor = container.querySelector("a")

    expect(anchor?.className).toContain("container")
  })
})
