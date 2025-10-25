import { SerpElement } from "@nosto/search-js/preact/serp"
import { cl } from "@nosto/search-js/utils"
import styles from "./Product.module.css"
import type { Product } from "@/types"
import { renderRatingStars } from "./renderRatingStars"
import ProductImage from "./ProductImage"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
  showAltOnHover?: boolean
}

/**
 * A comprehensive product card component that displays product information with interactive features.
 * Supports alternate image display on hover, new product badges, ratings, and price comparisons.
 * Integrates with Nosto's SERP element tracking for analytics and provides accessible navigation.
 *
 * @param product - Product data object containing all display information (name, price, images, etc.)
 * @param children - Optional child elements to render within the product card (e.g., add to cart buttons)
 * @param showAltOnHover - Whether to show alternate product images on hover (defaults to true)
 * @returns An interactive product card with image, details, and optional child elements
 */
export default function Product({ product, children, showAltOnHover = true }: Props) {
  const hasAlternateImage = showAltOnHover && product.alternateImageUrls && product.alternateImageUrls.length > 0
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
      <div className={styles.image}>
        <ProductImage src={product.imageUrl!} alt={product.name} />
        {hasAlternateImage && <ProductImage src={product.alternateImageUrls![0]} alt={product.name} />}
        {isNew && <div className={styles.newRibbon}>New</div>}
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
