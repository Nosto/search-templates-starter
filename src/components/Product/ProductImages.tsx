import { useState } from "preact/hooks"
import styles from "./Product.module.css"
import ProductImage from "./ProductImage"
import type { Product } from "@/types"

export type ProductImagesMode = "single" | "alternate" | "carousel"

type ProductImagesProps = {
  /** Product data */
  product: Product
  /** Display mode for images */
  mode?: ProductImagesMode
  /** Additional children (like new ribbon) */
  children?: preact.ComponentChildren
}

export default function ProductImages({ product, mode = "alternate", children }: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const imageUrl = product.imageUrl!
  const alternateImageUrls = product.alternateImageUrls || []
  const alt = product.name

  // All available images (primary + alternates)
  const allImages = [imageUrl, ...alternateImageUrls]
  const hasAlternateImages = alternateImageUrls.length > 0

  const renderSingleMode = () => (
    <div className={styles.image}>
      <ProductImage src={imageUrl} alt={alt} />
      {children}
    </div>
  )

  const renderAlternateMode = () => (
    <div className={styles.image}>
      <ProductImage src={imageUrl} alt={alt} />
      {hasAlternateImages && <ProductImage src={alternateImageUrls[0]} alt={alt} />}
      {children}
    </div>
  )

  const renderCarouselMode = () => {
    if (allImages.length <= 1) {
      return renderSingleMode()
    }

    const handlePrevious = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setCurrentImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))
    }

    const handleNext = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setCurrentImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))
    }

    return (
      <div className={`${styles.image} ${styles.carousel}`}>
        <ProductImage src={allImages[currentImageIndex]} alt={alt} />
        {allImages.length > 1 && (
          <>
            <button
              className={`${styles.carouselButton} ${styles.carouselPrev}`}
              onClick={handlePrevious}
              aria-label="Previous image"
              type="button"
            >
              ‹
            </button>
            <button
              className={`${styles.carouselButton} ${styles.carouselNext}`}
              onClick={handleNext}
              aria-label="Next image"
              type="button"
            >
              ›
            </button>
            <div className={styles.carouselIndicators}>
              {allImages.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.carouselIndicator} ${index === currentImageIndex ? styles.active : ""}`}
                  onClick={(e: MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  aria-label={`Go to image ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          </>
        )}
        {children}
      </div>
    )
  }

  switch (mode) {
    case "single":
      return renderSingleMode()
    case "carousel":
      return renderCarouselMode()
    case "alternate":
    default:
      return renderAlternateMode()
  }
}
