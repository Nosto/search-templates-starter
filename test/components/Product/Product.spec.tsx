import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/preact"
import Product from "../../../src/components/Product/Product"
import type { Product as ProductType } from "../../../src/types"
import { createMockProduct } from "../../../mocks/products"

const mockSaleProduct: ProductType = createMockProduct({
  productId: "test-sale",
  name: "Test Sale Product",
  price: 50,
  listPrice: 80,
  priceText: "€50.00",
  listPriceText: "€80.00"
})

const mockRegularProduct: ProductType = createMockProduct({
  productId: "test-regular",
  name: "Test Regular Product",
  price: 75,
  listPrice: 75,
  priceText: "€75.00",
  listPriceText: "€75.00"
})

const mockNewProduct: ProductType = createMockProduct({
  productId: "test-new",
  name: "Test New Product",
  datePublished: Date.now() - 7 * 24 * 60 * 60 * 1000 // 7 days ago
})

const mockNewSaleProduct: ProductType = createMockProduct({
  productId: "test-new-sale",
  name: "Test New Sale Product",
  price: 60,
  listPrice: 90,
  priceText: "€60.00",
  listPriceText: "€90.00",
  datePublished: Date.now() - 7 * 24 * 60 * 60 * 1000 // 7 days ago
})

describe("Product Component - Sale Ribbon", () => {
  it("should display sale ribbon when product price is lower than list price", () => {
    render(<Product product={mockSaleProduct} />)
    
    const saleRibbon = screen.getByText("Sale")
    expect(saleRibbon).toBeInTheDocument()
  })

  it("should not display sale ribbon when product price equals list price", () => {
    render(<Product product={mockRegularProduct} />)
    
    const saleRibbon = screen.queryByText("Sale")
    expect(saleRibbon).not.toBeInTheDocument()
  })

  it("should display new ribbon when product is published within 14 days", () => {
    render(<Product product={mockNewProduct} />)
    
    const newRibbon = screen.getByText("New")
    expect(newRibbon).toBeInTheDocument()
  })

  it("should display both new and sale ribbons when product is new and on sale", () => {
    render(<Product product={mockNewSaleProduct} />)
    
    const newRibbon = screen.getByText("New")
    const saleRibbon = screen.getByText("Sale")
    
    expect(newRibbon).toBeInTheDocument()
    expect(saleRibbon).toBeInTheDocument()
  })

  it("should not display sale ribbon when listPrice is undefined", () => {
    const productWithoutListPrice = createMockProduct({
      productId: "test-no-list-price",
      name: "Test Product",
      price: 50,
      listPrice: undefined
    })

    render(<Product product={productWithoutListPrice} />)
    
    const saleRibbon = screen.queryByText("Sale")
    expect(saleRibbon).not.toBeInTheDocument()
  })

  it("should not display sale ribbon when price is undefined", () => {
    const productWithoutPrice = createMockProduct({
      productId: "test-no-price",
      name: "Test Product",
      price: undefined,
      listPrice: 80
    })

    render(<Product product={productWithoutPrice} />)
    
    const saleRibbon = screen.queryByText("Sale")
    expect(saleRibbon).not.toBeInTheDocument()
  })
})