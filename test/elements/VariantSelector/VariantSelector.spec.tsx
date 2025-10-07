import { render } from "@testing-library/preact"
import { describe, it, expect } from "vitest"
import VariantSelector from "@/elements/VariantSelector/VariantSelector"

describe("VariantSelector", () => {
  it("should render variant selector element with handle prop", () => {
    const { container } = render(<VariantSelector handle="test-product" />)

    const variantSelector = container.querySelector("nosto-variant-selector")
    expect(variantSelector).toBeTruthy()
    expect(variantSelector?.getAttribute("handle")).toBe("test-product")
  })

  it("should render without handle prop", () => {
    const { container } = render(<VariantSelector handle="" />)

    const variantSelector = container.querySelector("nosto-variant-selector")
    expect(variantSelector).toBeTruthy()
    expect(variantSelector?.getAttribute("handle")).toBe("")
  })
})