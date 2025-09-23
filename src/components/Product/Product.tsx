import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import type { Product } from "@/types"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
}

function renderRatingStars(ratingValue: number): string {
  const maxStars = 5
  const fullStars = Math.floor(ratingValue)
  const hasHalfStar = ratingValue % 1 !== 0

  // Create filled stars using repeat
  const filledStars = "★".repeat(fullStars)

  // Add half star if needed
  const halfStar = hasHalfStar && fullStars < maxStars ? "☆" : ""

  // Fill remaining with empty stars using repeat
  const remainingStars = maxStars - fullStars - (hasHalfStar ? 1 : 0)
  const emptyStars = "☆".repeat(remainingStars)

  return filledStars + halfStar + emptyStars
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
        {product.ratingValue !== undefined && product.reviewCount && (
          <div aria-label={`${product.ratingValue} out of 5 stars, ${product.reviewCount} reviews`}>
            {renderRatingStars(product.ratingValue)} ({product.reviewCount})
          </div>
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
