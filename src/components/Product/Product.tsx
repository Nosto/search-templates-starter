import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import type { Product } from "@/types"
import { renderRatingStars } from "./renderRatingStars"
import ImageAlternate from "../ProductImages/ImageAlternate"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
}

export default function Product({ product, children }: Props) {
  const isNew = product.datePublished && product.datePublished >= Date.now() - 14 * 24 * 60 * 60 * 1000

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
      <ImageAlternate product={product}>{isNew && <div className={styles.newRibbon}>New</div>}</ImageAlternate>
      <div className={styles.info} data-nosto-element="product">
        {product.brand && <div>{product.brand}</div>}
        <div>{product.name}</div>
        <div aria-label="Price">
          <span>{product.priceText}</span>
          {product.listPrice && product.price && product.listPrice > product.price && (
            <span className={styles.specialPrice}>{product.listPriceText}</span>
          )}
        </div>
        {product.ratingValue !== undefined && product.reviewCount ? (
          <div aria-label={`${product.ratingValue} out of 5 stars, ${product.reviewCount} reviews`}>
            {renderRatingStars(product.ratingValue)} ({product.reviewCount})
          </div>
        ) : null}
      </div>
      {children}
    </SerpElement>
  )
}
