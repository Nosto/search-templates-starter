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
    expect(element).not.toBeNull()
    expect(element.getAttribute("src")).toBe("https://example.com/img.jpg")
    expect(element.getAttribute("width")).toBe("320")
    expect(element.getAttribute("height")).toBe("180")
    expect(element.getAttribute("alt")).toBe("Example image")

    const img = element.shadowRoot!.querySelector("img") as HTMLImageElement
    expect(img).not.toBeNull()
    expect(img.getAttribute("src")).toBe("https://example.com/img.jpg")
    expect(img.getAttribute("width")).toBe("320")
    expect(img.getAttribute("height")).toBe("180")
    expect(img.getAttribute("alt")).toBe("Example image")
    expect(img.getAttribute("sizes")).toBe("(min-width: 320px) 320px, 100vw")
    expect(img.getAttribute("loading")).toBe("lazy")
    expect(img.getAttribute("decoding")).toBe("async")
    expect(img.getAttribute("style")).toContain("object-fit: cover;")
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
    expect(element.getAttribute("src")).toBe("https://example.com/responsive.jpg")
    expect(element.getAttribute("width")).toBe("640")
    expect(element.getAttribute("height")).toBe("360")
    expect(element.getAttribute("layout")).toBe("constrained")
    expect(element.getAttribute("aspect-ratio")).toBe("1.7777777777777777")
    expect(element.getAttribute("crop")).toBe("center")
    expect(element.getAttribute("sizes")).toBe("(min-width: 1024px) 50vw, 100vw")

    const img = element.shadowRoot!.querySelector("img") as HTMLImageElement
    expect(img).not.toBeNull()
    expect(img.getAttribute("src")).toBe("https://example.com/responsive.jpg")
    expect(img.getAttribute("width")).toBe("640")
    expect(img.getAttribute("height")).toBe("360")
    expect(img.getAttribute("sizes")).toBe("(min-width: 1024px) 50vw, 100vw")
    expect(img.getAttribute("loading")).toBe("lazy")
    expect(img.getAttribute("decoding")).toBe("async")
    expect(img.getAttribute("style")).toContain("object-fit: cover;")
    expect(img.getAttribute("style")).toContain("max-width: 640px;")
    expect(img.getAttribute("style")).toContain("max-height: 360px;")
    expect(img.getAttribute("style")).toContain("width: 100%;")
  })
})
