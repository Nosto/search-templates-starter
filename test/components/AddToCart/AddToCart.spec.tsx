import { render, screen, fireEvent, waitFor } from "@testing-library/preact"
import { describe, it, expect, vi, beforeEach } from "vitest"
import AddToCart from "@/components/AddToCart/AddToCart"
import type { Product } from "@/types"

// Mock the addToCart function
vi.mock("@nosto/search-js", () => ({
  addToCart: vi.fn()
}))

import { addToCart } from "@nosto/search-js"

describe("AddToCart", () => {
  const mockProduct: Product = {
    productId: "test-product-1",
    name: "Test Product",
    url: "https://example.com/product/test-product-1",
    handle: "test-product-1",
    imageUrl: "https://example.com/image.jpg",
    price: 29.99,
    priceText: "$29.99"
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render children content", () => {
    render(
      <AddToCart product={mockProduct} type="serp">
        Add to Cart
      </AddToCart>
    )

    expect(screen.getByRole("button", { name: "Add to Cart" })).toBeTruthy()
  })

  it("should add to cart directly when product has no SKUs", async () => {
    render(
      <AddToCart product={mockProduct} type="serp">
        Add to Cart
      </AddToCart>
    )

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }))

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith(
        "serp",
        {
          productId: "test-product-1",
          url: "https://example.com/product/test-product-1",
          skuId: "test-product-1"
        },
        1
      )
    })
  })

  it("should add to cart directly when product has one SKU", async () => {
    const productWithOneSku: Product = {
      ...mockProduct,
      skus: [{ id: "sku-1", price: 29.99 }]
    }

    render(
      <AddToCart product={productWithOneSku} type="serp">
        Add to Cart
      </AddToCart>
    )

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }))

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith(
        "serp",
        {
          productId: "test-product-1",
          url: "https://example.com/product/test-product-1",
          skuId: "sku-1"
        },
        1
      )
    })
  })

  it("should open modal when product has multiple SKUs", async () => {
    const productWithMultipleSku: Product = {
      ...mockProduct,
      skus: [
        { id: "sku-1", price: 29.99 },
        { id: "sku-2", price: 34.99 }
      ]
    }

    render(
      <AddToCart product={productWithMultipleSku} type="serp">
        Add to Cart
      </AddToCart>
    )

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }))

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy()
      expect(screen.getByText("Test Product")).toBeTruthy()
    })

    // Should not call addToCart immediately
    expect(addToCart).not.toHaveBeenCalled()
  })

  it("should close modal when close button is clicked", async () => {
    const productWithMultipleSku: Product = {
      ...mockProduct,
      skus: [
        { id: "sku-1", price: 29.99 },
        { id: "sku-2", price: 34.99 }
      ]
    }

    render(
      <AddToCart product={productWithMultipleSku} type="serp">
        Add to Cart
      </AddToCart>
    )

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }))

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy()
    })

    fireEvent.click(screen.getByLabelText("Close modal"))

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull()
    })
  })

  it("should close modal when backdrop is clicked", async () => {
    const productWithMultipleSku: Product = {
      ...mockProduct,
      skus: [
        { id: "sku-1", price: 29.99 },
        { id: "sku-2", price: 34.99 }
      ]
    }

    render(
      <AddToCart product={productWithMultipleSku} type="serp">
        Add to Cart
      </AddToCart>
    )

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }))

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy()
    })

    // Click on the backdrop
    const backdrop = screen.getByTestId("modal-backdrop")
    fireEvent.click(backdrop)

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull()
    })
  })

  it("should close modal when Escape key is pressed", async () => {
    const productWithMultipleSku: Product = {
      ...mockProduct,
      skus: [
        { id: "sku-1", price: 29.99 },
        { id: "sku-2", price: 34.99 }
      ]
    }

    render(
      <AddToCart product={productWithMultipleSku} type="serp">
        Add to Cart
      </AddToCart>
    )

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }))

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy()
    })

    // Press Escape on the backdrop element
    const backdrop = screen.getByTestId("modal-backdrop")
    fireEvent.keyDown(backdrop, { key: "Escape" })

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull()
    })
  })

  it("should prevent event propagation when button is clicked", () => {
    const parentClickHandler = vi.fn()

    const handleParentKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        parentClickHandler(e)
      }
    }

    render(
      <div onClick={parentClickHandler} onKeyDown={handleParentKeyDown} role="button" tabIndex={0}>
        <AddToCart product={mockProduct} type="serp">
          Add to Cart
        </AddToCart>
      </div>
    )

    // Click the inner AddToCart button, not the parent div
    const buttons = screen.getAllByRole("button", { name: "Add to Cart" })
    const addToCartButton = buttons.find(button => button.tagName === "BUTTON")!
    fireEvent.click(addToCartButton)

    expect(parentClickHandler).not.toHaveBeenCalled()
  })
})
