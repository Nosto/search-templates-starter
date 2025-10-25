import { useState } from "preact/hooks"
import styles from "./ProductImages.module.css"
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
    <div className={`${styles.image} ${hasAlternateImages ? styles.alternateContainer : ""}`}>
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

    const handleIndicatorClick = (index: number) => (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setCurrentImageIndex(index)
    }

    return (
      <div className={`${styles.image} ${styles.carousel}`}>
        <div className={styles.carouselContainer} style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {allImages.map((imageUrl, index) => (
            <div key={index} className={styles.carouselSlide}>
              <ProductImage src={imageUrl} alt={`${alt} - Image ${index + 1}`} />
            </div>
          ))}
        </div>

        {allImages.length > 1 && (
          <>
            <div className={styles.carouselControls}>
              <button
                className={styles.carouselButton}
                onClick={handlePrevious}
                aria-label="Previous image"
                type="button"
              >
                ‹
              </button>
              <button className={styles.carouselButton} onClick={handleNext} aria-label="Next image" type="button">
                ›
              </button>
            </div>

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
