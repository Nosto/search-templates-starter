import { SearchProducts } from "@nosto/nosto-js/client"
import type { Product } from "../src/types"

/**
 * Creates a base product with default values that can be customized
 */
export function createBaseProduct(overrides: Partial<Product> = {}): Product {
  const defaults = {
    productId: "default-id",
    name: "Default Product",
    price: 100.0,
    priceText: "€100.00",
    imageUrl: "https://picsum.photos/300/300",
    url: "https://example.com/product",
    handle: "default-product",
    brand: "Default Brand",
    availability: "InStock",
    currency: "EUR"
  } as Product

  return {
    ...defaults,
    ...overrides
  }
}

function createProductsResponse(products: Product[]) {
  return {
    hits: products,
    total: products.length
  } satisfies SearchProducts
}

function createEmptyResponse() {
  return {
    hits: [],
    total: 0
  } satisfies SearchProducts
}

export function generateMockProducts(count: number): Product[] {
  const brands = ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE", "BrandF"]
  const adjectives = ["Premium", "Classic", "Modern", "Vintage", "Eco-Friendly", "Luxury"]
  const productTypes = ["Shirt", "Jacket", "Shoes", "Phone", "Laptop", "Chair", "Ball", "Novel", "Cream", "Watch"]

  return Array.from({ length: count }, (_, index) => {
    const productNum = index + 1
    const brandIndex = index % brands.length
    const adjectiveIndex = index % adjectives.length
    const typeIndex = index % productTypes.length
    const listPrice = Math.round((Math.random() * 200 + 20) * 100) / 100

    return createBaseProduct({
      productId: `product-${productNum}`,
      name: `${adjectives[adjectiveIndex]} ${productTypes[typeIndex]} ${productNum}`,
      price: Math.round(Math.random() * listPrice * 100) / 100,
      listPrice,
      brand: brands[brandIndex],
      url: `https://example.com/product-${productNum}`,
      description: `High-quality ${adjectives[adjectiveIndex].toLowerCase()} ${productTypes[typeIndex].toLowerCase()} from ${brands[brandIndex]}`
    })
  })
}

export const mockProduct = createBaseProduct({
  productId: "12345",
  name: "Running Shoes",
  brand: "Nike",
  price: 120.0,
  listPrice: 150.0,
  priceText: "€120.00",
  listPriceText: "€150.00",
  url: "https://example.com/products/running-shoes",
  handle: "running-shoes"
})

export const mockProductNoSale = createBaseProduct({
  productId: "67890",
  name: "Casual Sneakers",
  brand: "Adidas",
  price: 80.0,
  priceText: "€80.00",
  imageUrl: "https://picsum.photos/300/300?random=2",
  url: "https://example.com/products/casual-sneakers",
  handle: "casual-sneakers"
})

export const mockProductNoBrand = createBaseProduct({
  productId: "54321",
  name: "Generic Sports Shoes",
  price: 60.0,
  priceText: "€60.00",
  imageUrl: "https://picsum.photos/300/300?random=3",
  url: "https://example.com/products/generic-sports-shoes",
  handle: "generic-sports-shoes",
  brand: undefined
})

export const mockSerpProduct = createBaseProduct({
  productId: "1",
  name: "Sample Product",
  price: 30.0,
  listPrice: 40.0,
  priceCurrencyCode: "EUR",
  url: "https://example.com/product",
  handle: undefined
})

export const mockProducts = createProductsResponse(generateMockProducts(5))

export const mockEmptyProducts = createEmptyResponse()
