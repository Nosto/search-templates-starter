import type { Product } from "@/types"

/**
 * Checks if a product is a content product by looking for custom field contentType === 'article'
 */
export function isContentProduct(product: Product) {
  return product.customFields?.some(field => field.key === "contentType" && field.value === "article") ?? false
}

/**
 * Splits products into normal products and content products
 */
export function splitProductsByType(products: Product[]) {
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
