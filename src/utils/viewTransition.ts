/**
 * Utility function to handle view transitions if supported by the browser.
 * @param callback - The function to execute during the view transition.
 */
export function startViewTransition(callback: () => Promise<void> | void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback)
  } else {
    callback()
  }
}

/**
 * Generates a unique view transition name for a product image.
 * @param productId - The unique product identifier.
 * @returns The view transition name or undefined if productId is not provided.
 */
export function getProductImageTransitionName(productId?: string): string | undefined {
  return productId ? `product-image-${productId}` : undefined
}
