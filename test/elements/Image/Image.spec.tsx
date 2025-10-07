import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import Image from "@/elements/Image/Image"

describe("Image", () => {
  it("renders custom element with required src prop", () => {
    const { container } = render(<Image src="https://example.com/image.jpg" />)
    const el = container.querySelector("nosto-image") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe('<nosto-image src="https://example.com/image.jpg"></nosto-image>')
  })

  it("renders all supported props as attributes", () => {
    const { container } = render(
      <Image
        src="https://example.com/image.jpg"
        width={400}
        height={300}
        aspectRatio={1.33}
        layout="fixed"
        crop="center"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    )
    const el = container.querySelector("nosto-image") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-image aspect-ratio="1.33" src="https://example.com/image.jpg" width="400" height="300" layout="fixed" crop="center" sizes="(max-width: 768px) 100vw, 50vw"></nosto-image>'
    )
  })

  it("renders with partial props", () => {
    const { container } = render(<Image src="https://example.com/image.jpg" width={500} aspectRatio={1.5} />)
    const el = container.querySelector("nosto-image") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-image aspect-ratio="1.5" src="https://example.com/image.jpg" width="500"></nosto-image>'
    )
  })
})
