import { SerpElement } from "@nosto/search-js/preact/serp"
import { productImagePlaceholder } from "@/helpers"
import styles from "./Product.module.css"
import { DecoratedProduct } from "@nosto/search-js"
import { hitDecorators } from "@/config"
import DynamicCard from "../DynamicCard/DynamicCard"

type Props = {
  product: DecoratedProduct<typeof hitDecorators>
  previewImage?: string
  children?: preact.JSX.Element | preact.JSX.Element[]
}

export default function Product({ product, previewImage, children }: Props) {
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
        <img src={previewImage ?? product.imageUrl ?? productImagePlaceholder} alt={product.name} />
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
