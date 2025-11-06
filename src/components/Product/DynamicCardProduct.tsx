import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import { cl } from "@nosto/search-js/utils"

export default function DynamicCardProduct({ product }: { product: Product }) {
  const isSkeleton = product.tags1?.includes("skeleton")

  if (isSkeleton) {
    return (
      <div
        className={cl(styles.container, styles.skeleton)}
        aria-label={`Product ${product.name}`}
      >
        <div className={styles.image}>
          <img src={product.imageUrl} alt={product.name} className={styles.img} />
        </div>
        <div className={styles.info}>
          <div>...</div>
          <div>...</div>
          <div>...</div>
        </div>
      </div>
    )
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
