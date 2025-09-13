import { SearchProducts } from "@nosto/nosto-js/client"
import type { Product } from "../src/types"

export function createProduct(overrides: Partial<Product> = {}): Product {
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
    imageUrl: `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 10000)}`,
    description: `High-quality ${adjectives[adjectiveIndex].toLowerCase()} ${productTypes[typeIndex].toLowerCase()} from ${brands[brandIndex]}`,
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
    createProduct({
      productId: `product-${index + 1}`,
      url: `https://example.com/product-${index + 1}`
    })
  )
}

export const mockProduct = createProduct({
  productId: "12345",
  name: "Running Shoes"
})

export const mockProductNoSale = createProduct({
  productId: "67890",
  name: "Casual Sneakers"
})

export const mockProductNoBrand = createProduct({
  productId: "54321",
  name: "Generic Sports Shoes",
  brand: undefined
})

export const mockSerpProduct = createProduct({
  productId: "1",
  name: "Sample Product"
})

export const mockProducts = createProductsResponse(generateMockProducts(5))

export const mockEmptyProducts = createEmptyResponse()
