import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import type { Product } from "@/types"
import DynamicCard from "../DynamicCard/DynamicCard"
import { useState } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"
import Pill from "@/elements/Pill/Pill"

type Props = {
  product: Product
  children?: preact.JSX.Element | preact.JSX.Element[]
}

export default function Product({ product, children }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    nostojs(api =>
      api.recordSearchAddToCart("serp", {
        productId: product.productId!,
        url: product.url
      })
    )
  }

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
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
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
      </div>
      {isHovered && (
        <div className={styles.addToCartPill}>
          <Pill onClick={handleAddToCart}>Add to cart</Pill>
        </div>
      )}
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
