import type { Preview } from "@storybook/preact-vite"
import { h } from "preact"
import { SearchPageProvider } from "@nosto/search-js/preact/serp"

// Function to generate mock products with varying data
function generateMockProducts(count: number) {
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

    return {
      productId: `product-${productNum}`,
      title: `${adjectives[adjectiveIndex]} ${productTypes[typeIndex]} ${productNum}`,
      price: Math.round((Math.random() * 200 + 20) * 100) / 100, // Random price between 20-220
      currency: "EUR",
      category: categories[categoryIndex],
      brand: brands[brandIndex],
      availability: "InStock",
      url: `/product-${productNum}`,
      imageUrl: `https://via.placeholder.com/300x300?text=Product+${productNum}`,
      description: `High-quality ${adjectives[adjectiveIndex].toLowerCase()} ${productTypes[typeIndex].toLowerCase()} from ${brands[brandIndex]}`
    }
  })
}

// Mock config for Storybook that provides search context
const mockConfig = {
  defaultCurrency: "EUR",
  search: {
    hitDecorators: []
  }
}

const mockInitialState = {
  search: {
    query: "",
    filters: [],
    sort: { field: "_score", order: "desc" }
  },
  products: {
    from: 1,
    size: 24,
    total: 142,
    hits: generateMockProducts(24)
  }
}

const preview: Preview = {
  decorators: [Story => h(SearchPageProvider, { config: mockConfig, initialState: mockInitialState }, h(Story))],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
