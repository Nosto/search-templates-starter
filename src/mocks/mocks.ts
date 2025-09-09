import { type SerpConfig } from "@nosto/search-js/preact/serp"
import { type State } from "@nosto/search-js/preact/common"

// ============================================================================
// Product Mock Data Generation
// ============================================================================

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

// ============================================================================
// Search Config & State Mocks
// ============================================================================

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

// ============================================================================
// Facet Mock Data
// ============================================================================

export const mockCategoryFacet = {
  id: "category",
  name: "Category",
  field: "categories",
  type: "terms" as const,
  data: [
    { value: "shoes", count: 42, selected: false },
    { value: "clothing", count: 28, selected: true },
    { value: "accessories", count: 15, selected: false }
  ]
}

export const mockBrandFacet = {
  id: "brand",
  name: "Brand",
  field: "brand",
  type: "terms" as const,
  data: [
    { value: "nike", count: 125, selected: false },
    { value: "adidas", count: 98, selected: true },
    { value: "puma", count: 67, selected: false },
    { value: "reebok", count: 45, selected: false },
    { value: "new-balance", count: 34, selected: false },
    { value: "under-armour", count: 23, selected: false }
  ]
}

// ============================================================================
// Range Facet Mock Data
// ============================================================================

export const mockPriceFacet = {
  id: "price",
  name: "Price",
  field: "price",
  type: "stats" as const,
  min: 10,
  max: 500
}

export const mockRatingFacet = {
  id: "rating",
  name: "Customer Rating",
  field: "rating",
  type: "stats" as const,
  min: 1,
  max: 5
}

export const mockWeightFacet = {
  id: "weight",
  name: "Weight (kg)",
  field: "weight",
  type: "stats" as const,
  min: 0.1,
  max: 25.0
}

// ============================================================================
// Product Mock Data (for components)
// ============================================================================

export const mockAutocompleteProduct = {
  productId: "12345",
  name: "Running Shoes",
  brand: "Nike",
  price: 120.0,
  listPrice: 150.0,
  priceText: "€120.00",
  listPriceText: "€150.00",
  imageUrl: "https://picsum.photos/300/300",
  url: "/products/running-shoes",
  handle: "running-shoes"
}

export const mockAutocompleteProductNoSale = {
  productId: "67890",
  name: "Casual Sneakers",
  brand: "Adidas",
  price: 80.0,
  priceText: "€80.00",
  imageUrl: "https://picsum.photos/300/300?random=2",
  url: "/products/casual-sneakers",
  handle: "casual-sneakers"
}

export const mockAutocompleteProductNoBrand = {
  productId: "54321",
  name: "Generic Sports Shoes",
  price: 60.0,
  priceText: "€60.00",
  imageUrl: "https://picsum.photos/300/300?random=3",
  url: "/products/generic-sports-shoes",
  handle: "generic-sports-shoes"
}

export const mockSerpProduct = {
  product_id: "1",
  name: "Sample Product",
  price: 30.0,
  listPrice: 40.0,
  currency: "EUR",
  imageUrl: "https://picsum.photos/300/300",
  url: "#"
}

// ============================================================================
// Autocomplete Products Collection
// ============================================================================

export const mockAutocompleteProducts = {
  hits: [
    mockAutocompleteProduct,
    {
      productId: "67890",
      name: "Casual Sneakers",
      brand: "Adidas",
      price: 80.0,
      priceText: "€80.00",
      imageUrl: "https://picsum.photos/300/300?random=2",
      url: "/products/casual-sneakers",
      handle: "casual-sneakers"
    },
    {
      productId: "54321",
      name: "Sports Shoes",
      brand: "Puma",
      price: 95.0,
      listPrice: 110.0,
      priceText: "€95.00",
      listPriceText: "€110.00",
      imageUrl: "https://picsum.photos/300/300?random=3",
      url: "/products/sports-shoes",
      handle: "sports-shoes"
    }
  ],
  total: 3
}

export const mockEmptyProducts = {
  hits: [],
  total: 0
}

// ============================================================================
// Keyword Mock Data
// ============================================================================

export const mockKeyword = {
  keyword: "running shoes",
  _highlight: {
    keyword: "<b>running</b> shoes"
  },
  facets: [],
  priority: 1,
  total: 1
}

export const mockKeywordNoHighlight = {
  keyword: "sneakers",
  facets: [],
  priority: 1,
  total: 1
}

export const mockKeywords = {
  hits: [
    {
      keyword: "running shoes",
      _highlight: {
        keyword: "<b>running</b> shoes"
      },
      facets: [],
      priority: 1,
      total: 3
    },
    {
      keyword: "running gear",
      _highlight: {
        keyword: "<b>running</b> gear"
      },
      facets: [],
      priority: 2,
      total: 3
    },
    {
      keyword: "marathon training",
      _highlight: {
        keyword: "marathon training"
      },
      facets: [],
      priority: 3,
      total: 3
    }
  ],
  total: 3
}

export const mockEmptyKeywords = {
  hits: [],
  total: 0
}
