import { render } from "@testing-library/preact"
import { describe, it, expect } from "vitest"
import Rating from "@/elements/Rating/Rating"

describe("Rating", () => {
  it("should render the correct rating value and review count", () => {
    const { container } = render(<Rating ratingValue={4} reviewCount={100} />)

    // Check that the component renders with correct aria-label
    const ratingContainer = container.querySelector('[aria-label="4 out of 5 stars, 100 reviews"]')
    expect(ratingContainer).toBeTruthy()

    // Check that review count is rendered
    const reviewText = container.textContent
    expect(reviewText).toContain("(100)")
  })

  it("should render half stars correctly", () => {
    const { container } = render(<Rating ratingValue={4.5} reviewCount={127} />)

    const ratingContainer = container.querySelector('[aria-label="4.5 out of 5 stars, 127 reviews"]')
    expect(ratingContainer).toBeTruthy()
    expect(container.textContent).toContain("(127)")
  })

  it("should render one star rating", () => {
    const { container } = render(<Rating ratingValue={1} reviewCount={5} />)

    const ratingContainer = container.querySelector('[aria-label="1 out of 5 stars, 5 reviews"]')
    expect(ratingContainer).toBeTruthy()
    expect(container.textContent).toContain("(5)")
  })

  it("should render five star rating", () => {
    const { container } = render(<Rating ratingValue={5} reviewCount={200} />)

    const ratingContainer = container.querySelector('[aria-label="5 out of 5 stars, 200 reviews"]')
    expect(ratingContainer).toBeTruthy()
    expect(container.textContent).toContain("(200)")
  })

  it("should render zero rating", () => {
    const { container } = render(<Rating ratingValue={0} reviewCount={0} />)

    const ratingContainer = container.querySelector('[aria-label="0 out of 5 stars, 0 reviews"]')
    expect(ratingContainer).toBeTruthy()
    expect(container.textContent).toContain("(0)")
  })

  it("should apply custom className", () => {
    const customClass = "custom-rating-class"
    const { container } = render(<Rating ratingValue={3} reviewCount={50} className={customClass} />)

    const ratingContainer = container.querySelector('[aria-label="3 out of 5 stars, 50 reviews"]')
    expect(ratingContainer?.className).toContain(customClass)
  })

  it("should render correct number of star icons", () => {
    const { container } = render(<Rating ratingValue={3.7} reviewCount={89} />)

    // Should have 5 star icons total (filled, half, and empty)
    const starIcons = container.querySelectorAll("i")
    expect(starIcons.length).toBe(5)

    const ratingContainer = container.querySelector('[aria-label="3.7 out of 5 stars, 89 reviews"]')
    expect(ratingContainer).toBeTruthy()
    expect(container.textContent).toContain("(89)")
  })
})
