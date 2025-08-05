import { SerpElement } from "@nosto/search-js/preact/serp"
import { productImagePlaceholder } from "@/helpers"
import { SearchProduct } from "@nosto/nosto-js/client"
import styles from "./Product.module.css"

export default function Product({
  product,
  previewImage,
  children
}: {
  product: SearchProduct
  previewImage?: string
  children?: preact.JSX.Element | preact.JSX.Element[]
}) {
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
            <span className={styles.specialPrice}>{product.listPrice}</span>
          )}
        </div>
      </div>
      {children}
    </SerpElement>
  )
}
