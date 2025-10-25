import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup, fireEvent } from "@testing-library/preact"
import ProductImages from "@/components/Product/ProductImages"

describe("ProductImages", () => {
  afterEach(cleanup)

  const mockImageUrl = "https://example.com/primary.jpg"
  const mockAlternateUrls = [
    "https://example.com/alt1.jpg",
    "https://example.com/alt2.jpg",
    "https://example.com/alt3.jpg"
  ]

  describe("single mode", () => {
    it("renders only the primary image", () => {
      const { container } = render(
        <ProductImages
          imageUrl={mockImageUrl}
          alternateImageUrls={mockAlternateUrls}
          alt="Test product"
          mode="single"
        />
      )

      const images = container.querySelectorAll("img")
      expect(images.length).toBe(1)
      expect(images[0].src).toBe(mockImageUrl)
      expect(images[0].alt).toBe("Test product")
    })

    it("renders children", () => {
      const { container } = render(
        <ProductImages imageUrl={mockImageUrl} alt="Test product" mode="single">
          <div data-testid="new-ribbon">New</div>
        </ProductImages>
      )

      const ribbon = container.querySelector('[data-testid="new-ribbon"]')
      expect(ribbon).not.toBeNull()
      expect(ribbon?.textContent).toBe("New")
    })
  })

  describe("alternate mode", () => {
    it("renders primary and first alternate image when alternate images available", () => {
      const { container } = render(
        <ProductImages
          imageUrl={mockImageUrl}
          alternateImageUrls={mockAlternateUrls}
          alt="Test product"
          mode="alternate"
        />
      )

      const images = container.querySelectorAll("img")
      expect(images.length).toBe(2)
      expect(images[0].src).toBe(mockImageUrl)
      expect(images[1].src).toBe(mockAlternateUrls[0])
    })

    it("renders only primary image when no alternate images", () => {
      const { container } = render(
        <ProductImages imageUrl={mockImageUrl} alternateImageUrls={[]} alt="Test product" mode="alternate" />
      )

      const images = container.querySelectorAll("img")
      expect(images.length).toBe(1)
      expect(images[0].src).toBe(mockImageUrl)
    })

    it("defaults to alternate mode when no mode specified", () => {
      const { container } = render(
        <ProductImages imageUrl={mockImageUrl} alternateImageUrls={mockAlternateUrls} alt="Test product" />
      )

      const images = container.querySelectorAll("img")
      expect(images.length).toBe(2)
    })
  })

  describe("carousel mode", () => {
    it("renders carousel with navigation when multiple images available", () => {
      const { container } = render(
        <ProductImages
          imageUrl={mockImageUrl}
          alternateImageUrls={mockAlternateUrls}
          alt="Test product"
          mode="carousel"
        />
      )

      const prevButton = container.querySelector('button[aria-label="Previous image"]')
      const nextButton = container.querySelector('button[aria-label="Next image"]')
      const indicators = container.querySelectorAll('button[aria-label^="Go to image"]')

      expect(prevButton).not.toBeNull()
      expect(nextButton).not.toBeNull()
      expect(indicators.length).toBe(4) // primary + 3 alternates
    })

    it("falls back to single mode when only one image", () => {
      const { container } = render(
        <ProductImages imageUrl={mockImageUrl} alternateImageUrls={[]} alt="Test product" mode="carousel" />
      )

      const images = container.querySelectorAll("img")
      const prevButton = container.querySelector('button[aria-label="Previous image"]')
      const nextButton = container.querySelector('button[aria-label="Next image"]')

      expect(images.length).toBe(1)
      expect(prevButton).toBeNull()
      expect(nextButton).toBeNull()
    })

    it("navigates to next image when next button clicked", () => {
      const { container } = render(
        <ProductImages
          imageUrl={mockImageUrl}
          alternateImageUrls={mockAlternateUrls}
          alt="Test product"
          mode="carousel"
        />
      )

      const nextButton = container.querySelector('button[aria-label="Next image"]') as HTMLButtonElement
      const image = container.querySelector("img") as HTMLImageElement

      expect(image.src).toBe(mockImageUrl)

      fireEvent.click(nextButton)

      expect(image.src).toBe(mockAlternateUrls[0])
    })

    it("navigates to previous image when previous button clicked", () => {
      const { container } = render(
        <ProductImages
          imageUrl={mockImageUrl}
          alternateImageUrls={mockAlternateUrls}
          alt="Test product"
          mode="carousel"
        />
      )

      const prevButton = container.querySelector('button[aria-label="Previous image"]') as HTMLButtonElement
      const image = container.querySelector("img") as HTMLImageElement

      expect(image.src).toBe(mockImageUrl)

      fireEvent.click(prevButton)

      // Should wrap to last image
      expect(image.src).toBe(mockAlternateUrls[2])
    })

    it("navigates using indicator buttons", () => {
      const { container } = render(
        <ProductImages
          imageUrl={mockImageUrl}
          alternateImageUrls={mockAlternateUrls}
          alt="Test product"
          mode="carousel"
        />
      )

      const indicators = container.querySelectorAll(
        'button[aria-label^="Go to image"]'
      ) as NodeListOf<HTMLButtonElement>
      const image = container.querySelector("img") as HTMLImageElement

      expect(image.src).toBe(mockImageUrl)

      // Click second indicator (first alternate image)
      fireEvent.click(indicators[1])

      expect(image.src).toBe(mockAlternateUrls[0])
    })

    it("prevents event propagation on button clicks", () => {
      let parentClicked = false
      const { container } = render(
        <button
          type="button"
          onClick={() => {
            parentClicked = true
          }}
        >
          <ProductImages
            imageUrl={mockImageUrl}
            alternateImageUrls={mockAlternateUrls}
            alt="Test product"
            mode="carousel"
          />
        </button>
      )

      const nextButton = container.querySelector('button[aria-label="Next image"]') as HTMLButtonElement
      fireEvent.click(nextButton)

      expect(parentClicked).toBe(false)
    })
  })
})
