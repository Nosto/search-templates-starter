import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import { cl } from "@nosto/search-js/utils"
import styles from "./Product.module.css"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import SkeletonProduct from "./SkeletonProduct"
import ProductImage from "./ProductImage"

export default function DynamicCardProduct({ product }: { product: Product }) {
  const isSkeleton = product.tags1?.includes("skeleton")

  if (isSkeleton) {
    return (
      <SerpElement
        as="div"
        hit={{
          productId: product.productId!,
          url: product.url
        }}
        componentProps={{
          "aria-label": "Loading product",
          className: cl(styles.container, styles.skeleton)
        }}
      >
        <div className={styles.image}>
          <ProductImage src={product.imageUrl!} alt="" className={styles.img} />
        </div>
        <div className={styles.info}>
          {product.brand && <div>{product.brand}</div>}
          <div>{product.name}</div>
          <div>
            <span>{product.priceText}</span>
          </div>
          {product.ratingValue !== undefined && product.reviewCount ? <div>★★★★★ {product.ratingValue}</div> : null}
        </div>
        <SkeletonProduct />
      </SerpElement>
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
