import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import { skeleton, styles } from "./styles"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import { cl } from "@nosto/search-js/utils"

/**
 * Renders a Shopify dynamic-card product search result. Keep the SerpElement wrapper in place so Nosto search analytics can track product clicks.
 */
export default function DynamicCardProduct({ product }: { product: Product }) {
  const isSkeleton = product.tags1?.includes("skeleton")

  if (isSkeleton) {
    return (
      <div className={cl(styles.container, skeleton.skeleton)} aria-label={`Product ${product.name}`}>
        <div className={styles.image}>
          <img src={product.imageUrl} alt={product.name} className={styles.img} />
        </div>
        <div className={styles.info}>
          <div className={skeleton.text}>...</div>
          <div className={skeleton.text}>...</div>
          <div className={skeleton.text}>...</div>
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
