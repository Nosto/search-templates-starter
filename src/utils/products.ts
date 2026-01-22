import type { Product } from "@/types"

/**
 * Checks if a product is a content product by looking for custom field type === 'content'
 */
export function isContentProduct(product: Product): boolean {
  return product.customFields?.some(field => field.key === "type" && field.value === "content") ?? false
}

/**
 * Splits products into normal products and content products
 */
export function splitProductsByType(products: Product[]): {
  normalProducts: Product[]
  contentProducts: Product[]
} {
  const normalProducts: Product[] = []
  const contentProducts: Product[] = []

  products.forEach(product => {
    if (isContentProduct(product)) {
      contentProducts.push(product)
    } else {
      normalProducts.push(product)
    }
  })

  return { normalProducts, contentProducts }
}
