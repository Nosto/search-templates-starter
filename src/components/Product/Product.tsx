import { SerpElement } from "@nosto/search-js/preact/serp"
import { cl } from "@nosto/search-js/utils"
import styles from "./Product.module.css"
import type { Product } from "@/types"
import { renderRatingStars } from "./renderRatingStars"
import ProductImages, { type ProductImagesMode } from "./ProductImages"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
  /** Mode for displaying product images */
  imageMode?: ProductImagesMode
}

export default function Product({ product, children, imageMode = "alternate" }: Props) {
  const hasAlternateImage = product.alternateImageUrls && product.alternateImageUrls.length > 0
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
        className: cl(styles.container, hasAlternateImage && styles.altContainer),
        href: product.url
      }}
    >
      <ProductImages product={product} mode={imageMode}>
        {isNew && <div className={styles.newRibbon}>New</div>}
      </ProductImages>
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
