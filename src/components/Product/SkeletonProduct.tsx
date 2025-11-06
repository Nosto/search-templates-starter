import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import { cl } from "@nosto/search-js/utils"
import styles from "./Product.module.css"
import ProductImage from "./ProductImage"

type Props = {
  product: Product
}

export default function SkeletonProduct({ product }: Props) {
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
    </SerpElement>
  )
}
