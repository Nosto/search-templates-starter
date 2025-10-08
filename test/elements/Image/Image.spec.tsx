import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/preact"
import Image from "@/elements/Image/Image"
import "@nosto/web-components"

describe("Image", () => {
  afterEach(cleanup)

  it("renders a nosto-image element", () => {
    const { container } = render(
      <Image src="https://example.com/img.jpg" width={320} height={180} alt="Example image" />
    )
    const element = container.querySelector("nosto-image") as HTMLElement

    expect(element).not.toBeNull()
    expect(element.outerHTML).toBe(
      '<nosto-image src="https://example.com/img.jpg" width="320" height="180" alt="Example image"><img alt="Example image" loading="lazy" decoding="async" sizes="(min-width: 320px) 320px, 100vw" src="https://example.com/img.jpg" width="320" height="180" style="object-fit: cover; max-width: 320px; max-height: 180px; aspect-ratio: 1.7777777777777777; width: 100%;"></nosto-image>'
    )
  })

  it("forwards layout-related props to the custom element", () => {
    const { container } = render(
      <Image
        src="https://example.com/responsive.jpg"
        width={640}
        height={360}
        layout="constrained"
        aspectRatio={16 / 9}
        crop="center"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    )
    const element = container.querySelector("nosto-image") as HTMLElement

    expect(element).not.toBeNull()
    expect(element.outerHTML).toBe(
      '<nosto-image src="https://example.com/responsive.jpg" width="640" height="360" layout="constrained" aspect-ratio="1.7777777777777777" crop="center" sizes="(min-width: 1024px) 50vw, 100vw"><img sizes="(min-width: 1024px) 50vw, 100vw" loading="lazy" decoding="async" src="https://example.com/responsive.jpg" width="640" height="360" style="object-fit: cover; max-width: 640px; max-height: 360px; aspect-ratio: 1.7777777777777777; width: 100%;"></nosto-image>'
    )
  })
})
