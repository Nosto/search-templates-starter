import styles from "./ProductImages.module.css"
import ProductImage from "../Product/ProductImage"
import ImageSingle from "./ImageSingle"
import type { CarouselComponentProps } from "./types"

export default function ImageCarousel({
  product,
  currentImageIndex,
  setCurrentImageIndex,
  children
}: CarouselComponentProps) {
  const imageUrl = product.imageUrl!
  const alternateImageUrls = product.alternateImageUrls || []
  const alt = product.name
  const allImages = [imageUrl, ...alternateImageUrls]

  if (allImages.length <= 1) {
    return <ImageSingle product={product}>{children}</ImageSingle>
  }

  const handleScroll = (e: Event) => {
    const container = e.target as HTMLDivElement
    const scrollLeft = container.scrollLeft
    const slideWidth = container.clientWidth
    const newIndex = Math.round(scrollLeft / slideWidth)

    if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < allImages.length) {
      setCurrentImageIndex(newIndex)
    }
  }

  const handleIndicatorClick = (index: number) => (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex(index)

    // Scroll to the selected image
    const container = e.currentTarget
      .closest(`.${styles.carousel}`)
      ?.querySelector(`.${styles.carouselContainer}`) as HTMLDivElement
    if (container) {
      container.scrollTo({
        left: index * container.clientWidth,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className={`${styles.image} ${styles.carousel}`}>
      <div
        className={styles.carouselContainer}
        onScroll={handleScroll}
        style={{
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory"
        }}
      >
        {allImages.map((imageUrl, index) => (
          <div key={index} className={styles.carouselSlide}>
            <ProductImage src={imageUrl} alt={`${alt} - Image ${index + 1}`} />
          </div>
        ))}
      </div>

      {allImages.length > 1 && (
        <div className={styles.carouselIndicators}>
          {allImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselIndicator} ${index === currentImageIndex ? styles.active : ""}`}
              onClick={handleIndicatorClick(index)}
              aria-label={`Go to image ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}

      {children}
    </div>
  )
}
