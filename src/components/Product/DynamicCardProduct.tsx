import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import { cl } from "@nosto/search-js/utils"
import styles from "./Product.module.css"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"

function SkeletonProduct() {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" className={cl(styles.container, styles.fakeProduct)}>
      <div className={styles.image}></div>
    </a>
  )
}

export default function DynamicCardProduct({ product }: { product: Product }) {
  const isSkeleton = product.tags1?.includes("skeleton")
  const ProductCard = isSkeleton ? SkeletonProduct : DynamicCard

  return (
    <SerpElement
      as={ProductCard}
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        handle: product.handle!,
        template: "card",
        className: cl(styles.container, isSkeleton && styles.skeleton)
      }}
    />
  )
}
