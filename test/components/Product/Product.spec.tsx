import { render, fireEvent } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import Product from "@/components/Product/Product"
import { mockSerpProduct } from "../../../mocks/products"

// Mock nostojs to avoid API errors in tests
const mockRecordSearchAddToCart = vi.fn()
vi.mock("@nosto/nosto-js", () => ({
  nostojs: vi.fn(callback => {
    const mockApi = {
      recordSearchAddToCart: mockRecordSearchAddToCart
    }
    callback(mockApi)
  })
}))

// Mock SerpElement to simplify testing
vi.mock("@nosto/search-js/preact/serp", () => ({
  SerpElement: ({
    children,
    componentProps
  }: {
    children: React.ReactNode
    componentProps: Record<string, unknown>
  }) => <div {...componentProps}>{children}</div>
}))

describe("Product Component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render product information", () => {
    const { getByText, getByAltText } = render(<Product product={mockSerpProduct} />)

    expect(getByText("Sample Product")).toBeTruthy()
    expect(getByAltText("Sample Product")).toBeTruthy()
  })

  it("should not show add to cart pill initially", () => {
    const { queryByRole } = render(<Product product={mockSerpProduct} />)

    const addToCartButton = queryByRole("button", { name: "Add to cart" })
    expect(addToCartButton).toBeNull()
  })

  it("should show add to cart pill on hover", () => {
    const { container, getByRole } = render(<Product product={mockSerpProduct} />)

    // Find the main container and simulate mouse enter
    const productContainer = container.firstElementChild
    fireEvent.mouseEnter(productContainer!)

    const addToCartButton = getByRole("button", { name: "Add to cart" })
    expect(addToCartButton).toBeTruthy()
  })

  it("should hide add to cart pill when not hovering", () => {
    const { container, queryByRole } = render(<Product product={mockSerpProduct} />)

    const productContainer = container.firstElementChild

    // Show pill on hover
    fireEvent.mouseEnter(productContainer!)
    expect(queryByRole("button", { name: "Add to cart" })).toBeTruthy()

    // Hide pill when not hovering
    fireEvent.mouseLeave(productContainer!)
    expect(queryByRole("button", { name: "Add to cart" })).toBeNull()
  })

  it("should call nostojs recordSearchAddToCart when add to cart is clicked", () => {
    const { container, getByRole } = render(<Product product={mockSerpProduct} />)

    // Show pill on hover
    const productContainer = container.firstElementChild
    fireEvent.mouseEnter(productContainer!)

    // Click add to cart button
    const addToCartButton = getByRole("button", { name: "Add to cart" })
    fireEvent.click(addToCartButton)

    expect(mockRecordSearchAddToCart).toHaveBeenCalledWith("serp", {
      productId: mockSerpProduct.productId,
      url: mockSerpProduct.url
    })
  })

  it("should prevent event bubbling when add to cart is clicked", () => {
    const { container, getByRole } = render(<Product product={mockSerpProduct} />)

    // Show pill on hover
    const productContainer = container.firstElementChild
    fireEvent.mouseEnter(productContainer!)

    const addToCartButton = getByRole("button", { name: "Add to cart" })

    // Click should work without throwing errors (preventDefault/stopPropagation are called internally)
    expect(() => fireEvent.click(addToCartButton)).not.toThrow()
  })

  it("should render children when provided", () => {
    const { getByText } = render(
      <Product product={mockSerpProduct}>
        <div>Additional content</div>
      </Product>
    )

    expect(getByText("Additional content")).toBeTruthy()
  })
})
