import styles from "./ProductImages.module.css"
import ProductImage from "../Product/ProductImage"
import type { ProductImagesPropsWithoutMode } from "./types"

export default function ImageSingle({ product, children }: ProductImagesPropsWithoutMode) {
  const imageUrl = product.imageUrl!
  const alt = product.name

  return (
    <div className={styles.image}>
      <ProductImage src={imageUrl} alt={alt} />
      {children}
    </div>
  )
}
