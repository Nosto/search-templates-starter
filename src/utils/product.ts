import type { Product } from "@/types"

/**
 * Checks if a product is considered "new" based on its datePublished field.
 * A product is considered new if it was published within the last 14 days.
 * @param product - The product to check
 * @returns true if the product was published within 14 days, false otherwise
 */
export const isProductNew = (product: Product): boolean => {
  if (!product.datePublished) {
    return false
  }

  const currentTime = Date.now()
  const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000

  return product.datePublished >= currentTime - fourteenDaysInMs
}
