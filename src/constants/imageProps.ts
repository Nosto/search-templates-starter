// Shared responsive image sizing configuration
// Can be customized as needed for different use cases
export const defaultImageSizes = `(min-width: 1024px) 25vw,
    (min-width: 768px) 33.33vw,
    (min-width: 375px) 50vw,
    100vw`

export const defaultImageProps = {
  width: 750,
  sizes: defaultImageSizes
}
