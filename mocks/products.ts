import { SearchProducts } from "@nosto/nosto-js/client"
import type { Product } from "../src/types"
import { createMockRandomImage } from "./images"

export function createMockProduct(overrides: Partial<Product> = {}): Product {
  const categories = ["Clothing", "Electronics", "Home & Garden", "Sports", "Books", "Beauty"]
  const brands = ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE", "BrandF"]
  const adjectives = ["Premium", "Classic", "Modern", "Vintage", "Eco-Friendly", "Luxury"]
  const productTypes = ["Shirt", "Jacket", "Shoes", "Phone", "Laptop", "Chair", "Ball", "Novel", "Cream", "Watch"]

  const randomIndex = Math.floor(Math.random() * brands.length)
  const categoryIndex = randomIndex % categories.length
  const brandIndex = randomIndex % brands.length
  const adjectiveIndex = randomIndex % adjectives.length
  const typeIndex = randomIndex % productTypes.length
  const listPrice = Math.round((Math.random() * 200 + 20) * 100) / 100
  const price = Math.round(Math.random() * listPrice * 100) / 100

  // Generate random rating and review count
  const ratingValue = Math.round((Math.random() * 4 + 1) * 10) / 10 // 1.0 to 5.0
  const reviewCount = Math.floor(Math.random() * 500) + 1 // 1 to 500

  return {
    productId: `product-${Math.floor(Math.random() * 10000)}`,
    name: `${adjectives[adjectiveIndex]} ${productTypes[typeIndex]}`,
    price,
    listPrice,
    priceText: `€${price.toFixed(2)}`,
    listPriceText: `€${listPrice.toFixed(2)}`,
    priceCurrencyCode: "EUR",
    category: categories[categoryIndex],
    brand: brands[brandIndex],
    availability: "InStock",
    url: `https://example.com/product-${Math.floor(Math.random() * 10000)}`,
    imageUrl: createMockRandomImage(),
    alternateImageUrls: [createMockRandomImage()],
    description: `High-quality ${adjectives[adjectiveIndex].toLowerCase()} ${productTypes[typeIndex].toLowerCase()} from ${brands[brandIndex]}`,
    ratingValue,
    reviewCount,
    ...overrides
  } as Product
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
  return Array.from({ length: count }, (_, index) =>
    createMockProduct({
      productId: `product-${index + 1}`,
      url: `https://example.com/product-${index + 1}`
    })
  )
}

export const mockProduct = createMockProduct({
  productId: "12345",
  name: "Running Shoes"
})

const DAY_IN_MILLIS = 24 * 60 * 60 * 1000

export const mockNewProduct = createMockProduct({
  productId: "new-123",
  name: "Brand New Sneakers",
  datePublished: Date.now() - 7 * DAY_IN_MILLIS
})

export const mockOldProduct = createMockProduct({
  productId: "old-456",
  name: "Classic Shoes",
  datePublished: Date.now() - 20 * DAY_IN_MILLIS
})

export const mockProductNoSale = createMockProduct({
  productId: "67890",
  name: "Casual Sneakers"
})

export const mockProductNoBrand = createMockProduct({
  productId: "54321",
  name: "Generic Sports Shoes",
  brand: undefined
})

export const mockSerpProduct = createMockProduct({
  productId: "1",
  name: "Sample Product",
  alternateImageUrls: [createMockRandomImage()]
})

export const mockProductWithAlt = createMockProduct({
  productId: "2",
  name: "Hover-enabled Product",
  imageUrl: createMockRandomImage(),
  alternateImageUrls: [createMockRandomImage()]
})

export const mockProductMultipleAlts = createMockProduct({
  productId: "3",
  name: "Multiple Alt Images",
  imageUrl: createMockRandomImage(),
  alternateImageUrls: [createMockRandomImage(), createMockRandomImage()]
})

export const mockProducts = createProductsResponse(generateMockProducts(6))

export const mockEmptyProducts = createEmptyResponse()
