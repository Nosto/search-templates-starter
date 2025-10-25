import styles from "./ProductImages.module.css"
import ProductImage from "../Product/ProductImage"
import type { ProductImagesPropsWithoutMode } from "./types"

export default function ImageAlternate({ product, children }: ProductImagesPropsWithoutMode) {
  const imageUrl = product.imageUrl!
  const alternateImageUrls = product.alternateImageUrls || []
  const alt = product.name
  const hasAlternateImages = alternateImageUrls.length > 0

  return (
    <div className={`${styles.image} ${hasAlternateImages ? styles.alternateContainer : ""}`}>
      <ProductImage src={imageUrl} alt={alt} />
      {hasAlternateImages && <ProductImage src={alternateImageUrls[0]} alt={alt} />}
      {children}
    </div>
  )
}
