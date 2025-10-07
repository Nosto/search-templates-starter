import { render } from "@testing-library/preact"
import { describe, expect, it } from "vitest"
import "@nosto/web-components"
import Image from "@/elements/Image/Image"

describe("Image", () => {
  it("renders custom element with required src prop", () => {
    const { container } = render(<Image src="https://example.com/image.jpg" width={400} />)
    const el = container.querySelector("nosto-image") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-image src="https://example.com/image.jpg" width="400"><img loading="lazy" decoding="async" sizes="(min-width: 400px) 400px, 100vw" src="https://example.com/image.jpg" width="400" style="object-fit: cover; max-width: 400px; width: 100%;"></nosto-image>'
    )
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
      '<nosto-image aspect-ratio="1.33" src="https://example.com/image.jpg" width="400" height="300" layout="fixed" crop="center" sizes="(max-width: 768px) 100vw, 50vw"><img sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" decoding="async" src="https://example.com/image.jpg" width="400" height="300" style="object-fit: cover; width: 400px; height: 300px;"></nosto-image>'
    )
  })

  it("renders with partial props", () => {
    const { container } = render(<Image src="https://example.com/image.jpg" width={500} aspectRatio={1.5} />)
    const el = container.querySelector("nosto-image") as HTMLElement
    expect(el).toBeTruthy()
    expect(el.outerHTML).toBe(
      '<nosto-image aspect-ratio="1.5" src="https://example.com/image.jpg" width="500"><img loading="lazy" decoding="async" sizes="(min-width: 500px) 500px, 100vw" src="https://example.com/image.jpg" width="500" height="333" style="object-fit: cover; max-width: 500px; max-height: 333px; aspect-ratio: 1.5; width: 100%;"></nosto-image>'
    )
  })
})
