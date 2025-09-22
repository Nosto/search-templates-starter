import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import type { Product } from "@/types"
import DynamicCard from "../DynamicCard/DynamicCard"
import Rating from "@/elements/Rating/Rating"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
}

export default function Product({ product, children }: Props) {
  return (
    <SerpElement
      as="a"
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        "aria-label": `Product ${product.name}`,
        className: styles.container,
        href: product.url
      }}
    >
      <div className={styles.image}>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className={styles.info} data-nosto-element="product">
        {product.brand && <div>{product.brand}</div>}
        <div>{product.name}</div>
        <div aria-label="Price">
          <span>{product.priceText}</span>
          {product.listPrice && product.price && product.listPrice > product.price && (
            <span className={styles.specialPrice}>{product.listPriceText}</span>
          )}
        </div>
        {product.ratingValue && product.reviewCount && product.ratingValue > 0 && product.reviewCount > 0 && (
          <Rating ratingValue={product.ratingValue} reviewCount={product.reviewCount} />
        )}
      </div>
      {children}
    </SerpElement>
  )
}

export function DynamicCardProduct({ product }: Props) {
  return (
    <SerpElement
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        "aria-label": `Product ${product.name}`,
        className: styles.container
      }}
    >
      <DynamicCard handle={product.handle!} template="card" />
    </SerpElement>
  )
}
