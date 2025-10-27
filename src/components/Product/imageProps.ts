// Shared responsive image sizing configuration
// Can be customized as needed for different use cases
export const imageSizes = `(min-width: 1024px) 25vw,
    (min-width: 768px) 33.33vw,
    (min-width: 375px) 50vw,
    100vw`

const windowWidth = window.innerWidth

const breakpoints = [320, 480, 640, 750, 828, 960, 1024, 1280, 1440, 1600, 1920].filter(
  bp => bp >= windowWidth / 4 && bp <= windowWidth
)

export const imageProps = {
  width: 750,
  sizes: imageSizes,
  fetchpriority: "high",
  breakpoints
  // if the product images have a consistent aspect ratio, you can uncomment the line below to set it
  //aspectRatio: 0.75
} as const
