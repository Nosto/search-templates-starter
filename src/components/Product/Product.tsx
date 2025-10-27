import { SerpElement } from "@nosto/search-js/preact/serp"
import { cl } from "@nosto/search-js/utils"
import styles from "./Product.module.css"
import type { Product } from "@/types"
import { renderRatingStars } from "./renderRatingStars"
import ProductImage from "./ProductImage"
import QuickAdd from "../QuickAdd/QuickAdd"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
  showAltOnHover?: boolean
}

export default function Product({ product, children, showAltOnHover = true }: Props) {
  const hasAlternateImage = showAltOnHover && product.alternateImageUrls && product.alternateImageUrls.length > 0
  const isNew = product.datePublished && product.datePublished >= Date.now() - 14 * 24 * 60 * 60 * 1000
  const isOnSale = product.listPrice && product.price && product.listPrice > product.price

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
      <div className={styles.image}>
        <ProductImage src={product.imageUrl!} alt={product.name} />
        {hasAlternateImage && <ProductImage src={product.alternateImageUrls![0]} alt={product.name} />}
        {isNew && !isOnSale && <div className={styles.newRibbon}>New</div>}
        {isOnSale && <div className={styles.saleRibbon}>Sale</div>}
        <QuickAdd product={product} className={styles.quickAdd}>
          Add to cart
        </QuickAdd>
      </div>
      <div className={styles.info} data-nosto-element="product">
        {product.brand && <div>{product.brand}</div>}
        <div>{product.name}</div>
        <div aria-label="Price">
          <span>{product.priceText}</span>
          {isOnSale && <span className={styles.specialPrice}>{product.listPriceText}</span>}
        </div>
        {product.ratingValue !== undefined && product.reviewCount ? (
          <div aria-label={`${product.ratingValue} out of 5 stars, ${product.reviewCount} reviews`}>
            {renderRatingStars(product.ratingValue)} {product.ratingValue}
          </div>
        ) : null}
      </div>
      {children}
    </SerpElement>
  )
}
