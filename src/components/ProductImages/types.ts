import type { ComponentChildren } from "preact"
import type { Product } from "@/types"

export type ProductImagesPropsWithoutMode = {
  /** Product data */
  product: Product
  /** Additional children (like new ribbon) */
  children?: ComponentChildren
}

export type CarouselComponentProps = ProductImagesPropsWithoutMode & {
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
}
