import { SerpElement } from "@nosto/search-js/preact/serp"
import { useState } from "preact/hooks"
import styles from "./Product.module.css"
import type { Product } from "@/types"
import DynamicCard from "../DynamicCard/DynamicCard"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
  showAltOnHover?: boolean
}

export default function Product({ product, children, showAltOnHover = false }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const hasAlternateImage = showAltOnHover && product.alternateImageUrls && product.alternateImageUrls.length > 0
  const displayImageUrl = hasAlternateImage && isHovered ? product.alternateImageUrls![0] : product.imageUrl

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
        href: product.url,
        onMouseEnter: hasAlternateImage ? () => setIsHovered(true) : undefined,
        onMouseLeave: hasAlternateImage ? () => setIsHovered(false) : undefined
      }}
    >
      <div className={styles.image}>
        <img src={displayImageUrl} alt={product.name} />
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
