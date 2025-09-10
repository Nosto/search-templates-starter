import { SearchProducts, SearchProduct } from "@nosto/nosto-js/client"

function createProductsResponse(products: SearchProduct[]): SearchProducts {
  return {
    hits: products,
    total: products.length
  }
}

function createEmptyResponse() {
  return {
    hits: [],
    total: 0
  }
}

export function generateMockProducts(count: number): SearchProduct[] {
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

export const mockProduct: SearchProduct = {
  productId: "12345",
  name: "Running Shoes",
  brand: "Nike",
  price: 120.0,
  listPrice: 150.0,
  priceText: "€120.00",
  imageUrl: "https://picsum.photos/300/300",
  url: "/products/running-shoes"
}

export const mockProductNoSale: SearchProduct = {
  productId: "67890",
  name: "Casual Sneakers",
  brand: "Adidas",
  price: 80.0,
  priceText: "€80.00",
  imageUrl: "https://picsum.photos/300/300?random=2",
  url: "/products/casual-sneakers"
}

export const mockProductNoBrand: SearchProduct = {
  productId: "54321",
  name: "Generic Sports Shoes",
  price: 60.0,
  priceText: "€60.00",
  imageUrl: "https://picsum.photos/300/300?random=3",
  url: "/products/generic-sports-shoes"
}

export const mockSerpProduct: SearchProduct = {
  productId: "1",
  name: "Sample Product",
  price: 30.0,
  listPrice: 40.0,
  priceCurrencyCode: "EUR",
  imageUrl: "https://picsum.photos/300/300",
  url: "#"
}

export const mockProducts = createProductsResponse(generateMockProducts(5))

export const mockEmptyProducts = createEmptyResponse()
