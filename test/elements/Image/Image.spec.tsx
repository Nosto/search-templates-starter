import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import Image from "@/elements/Image/Image"

describe("Image", () => {
  it("renders custom element with required props", () => {
    const { container } = render(<Image src="https://example.com/image.jpg" />)
    const el = container.querySelector("nosto-image") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-image src="https://example.com/image.jpg"></nosto-image>')
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <Image
        src="https://example.com/image.jpg"
        width={800}
        height={600}
        aspectRatio={1.33}
        layout="constrained"
        crop="center"
      />
    )
    const el = container.querySelector("nosto-image") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-image src="https://example.com/image.jpg" width="800" height="600" aspectratio="1.33" layout="constrained" crop="center"></nosto-image>'
    )
  })

  it("renders with layout and width only", () => {
    const { container } = render(<Image src="https://example.com/image.jpg" width={400} layout="fixed" />)
    const el = container.querySelector("nosto-image") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-image src="https://example.com/image.jpg" width="400" layout="fixed"></nosto-image>'
    )
  })
})
