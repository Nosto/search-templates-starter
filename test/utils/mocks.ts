import { type SerpConfig } from "@nosto/search-js/preact/serp"
import { type State } from "@nosto/search-js/preact/common"

export function generateMockProducts(count: number) {
  const categories = ["Clothing", "Electronics", "Home & Garden", "Sports", "Books", "Beauty"]
  const brands = ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE", "BrandF"]
  const adjectives = ["Premium", "Classic", "Modern", "Vintage", "Eco-Friendly", "Luxury"]
  const productTypes = ["Shirt", "Jacket", "Shoes", "Phone", "Laptop", "Chair", "Ball", "Novel", "Cream", "Watch"]

  return Array.from({ length: count }, (_, index) => {
    const productNum = index + 1
    const categoryIndex = index % categories.length
    const brandIndex = index % brands.length
    const adjectiveIndex = index % adjectives.length
    const typeIndex = index % productTypes.length
    const listPrice = Math.round((Math.random() * 200 + 20) * 100) / 100

    return {
      productId: `product-${productNum}`,
      title: `${adjectives[adjectiveIndex]} ${productTypes[typeIndex]} ${productNum}`,
      price: Math.round(Math.random() * listPrice * 100) / 100,
      listPrice,
      currency: "EUR",
      category: categories[categoryIndex],
      brand: brands[brandIndex],
      availability: "InStock",
      url: `/product-${productNum}`,
      imageUrl: "https://picsum.photos/300/300",
      description: `High-quality ${adjectives[adjectiveIndex].toLowerCase()} ${productTypes[typeIndex].toLowerCase()} from ${brands[brandIndex]}`
    }
  })
}

export const mockConfig: SerpConfig = {
  defaultCurrency: "EUR",
  search: {
    hitDecorators: []
  }
}

export const mockInitialState: Partial<State> = {
  loading: false,
  initialized: true,
  query: {
    query: "shoes",
    products: {
      filter: [
        {
          field: "color",
          value: ["red"]
        },
        {
          field: "price",
          range: [
            {
              gte: "50",
              lte: "150"
            }
          ]
        }
      ]
    }
  },
  response: {
    query: "shoes",
    products: {
      from: 1,
      size: 24,
      total: 142,
      hits: generateMockProducts(24)
    }
  }
}
