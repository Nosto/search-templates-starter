/**
 * Shared responsive image sizing configuration
 * These sizes help the browser select the appropriate image resolution
 * based on different viewport sizes and layout considerations
 */
export const responsiveImageSizes = `(min-width: 1024px) 25vw,
    (min-width: 768px) 33.33vw,
    (min-width: 375px) 50vw,
    100vw`

/**
 * Common image properties for product images
 */
export const productImageProps = {
  width: 750,
  sizes: responsiveImageSizes
}

/**
 * Note: SimpleCard component (nosto-simple-card) doesn't currently expose
 * image sizing configuration through props in version 8.31.2.
 * The component handles image sizing internally when fetching from Shopify.
 * Future versions may add support for sizes configuration.
 */
