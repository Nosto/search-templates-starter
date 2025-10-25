import { useState } from "preact/hooks"
import styles from "./ProductImages.module.css"
import ProductImage from "./ProductImage"
import type { Product } from "@/types"

export type ProductImagesMode = "single" | "alternate" | "carousel"

type ImageComponentProps = {
  imageUrl: string
  alternateImageUrls: string[]
  alt: string
  children?: preact.ComponentChildren
}

type CarouselComponentProps = ImageComponentProps & {
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
}

function ImageSingle({ imageUrl, alt, children }: ImageComponentProps) {
  return (
    <div className={styles.image}>
      <ProductImage src={imageUrl} alt={alt} />
      {children}
    </div>
  )
}

function ImageAlternate({ imageUrl, alternateImageUrls, alt, children }: ImageComponentProps) {
  const hasAlternateImages = alternateImageUrls.length > 0
  return (
    <div className={`${styles.image} ${hasAlternateImages ? styles.alternateContainer : ""}`}>
      <ProductImage src={imageUrl} alt={alt} />
      {hasAlternateImages && <ProductImage src={alternateImageUrls[0]} alt={alt} />}
      {children}
    </div>
  )
}

function ImageCarousel({
  imageUrl,
  alternateImageUrls,
  alt,
  currentImageIndex,
  setCurrentImageIndex,
  children
}: CarouselComponentProps) {
  const allImages = [imageUrl, ...alternateImageUrls]

  if (allImages.length <= 1) {
    return (
      <ImageSingle imageUrl={imageUrl} alternateImageUrls={alternateImageUrls} alt={alt}>
        {children}
      </ImageSingle>
    )
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

  const commonProps = { imageUrl, alternateImageUrls, alt, children }

  switch (mode) {
    case "single":
      return <ImageSingle {...commonProps} />
    case "carousel":
      return (
        <ImageCarousel
          {...commonProps}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      )
    case "alternate":
    default:
      return <ImageAlternate {...commonProps} />
  }
}
