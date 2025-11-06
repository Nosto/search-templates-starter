import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import SkeletonProduct from "./SkeletonProduct"

export default function DynamicCardProduct({ product }: { product: Product }) {
  const isSkeleton = product.tags1?.includes("skeleton")

  if (isSkeleton) {
    return <SkeletonProduct product={product} />
  }

  return (
    <SerpElement
      as={DynamicCard}
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        handle: product.handle!,
        template: "card",
        className: styles.container
      }}
    />
  )
}
