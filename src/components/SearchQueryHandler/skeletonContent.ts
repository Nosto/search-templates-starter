import { SearchQuery } from "@nosto/nosto-js/client"
import { defaultSize } from "@/config"
import { Product } from "@/types"

export function createSkeletonContent(query: SearchQuery) {
  return {
    initialized: true,
    query,
    response: {
      products: {
        facets: [],
        hits: Array.from({ length: defaultSize }, (_, i) => ({ ...mockProduct, productId: `skeleton-product-${i}` })),
        from: 0,
        size: defaultSize,
        total: defaultSize
      }
    }
  }
}

const mockProduct = {
  productId: "skeleton-product",
  name: "Name",
  url: "#",
  imageUrl:
    "data:image/svg+xml,%3Csvg width='300' height='400' fill='lightgrey' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='400'/%3E%3C/svg%3E",
  price: 100,
  priceText: "$100.00",
  listPrice: 100,
  listPriceText: "$100.00",
  brand: "Brand",
  tags1: ["skeleton"],
  ratingValue: 5,
  reviewCount: 100
} satisfies Product
