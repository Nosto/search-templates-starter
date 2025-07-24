import { SerpElement } from "@nosto/search-js/preact/serp"
import { productImagePlaceholder } from "../helpers"
import { SearchProduct } from "@nosto/nosto-js/client"
import style from "../styles/components/serpElement.module.css"

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
        className: style.serpElement,
        href: product.url
      }}
    >
      <div className={style.image}>
        <img src={previewImage ?? product.imageUrl ?? productImagePlaceholder} alt={product.name} />
      </div>
      <div className={style.info} data-nosto-element="product">
        {product.brand && <div>{product.brand}</div>}
        <div>{product.name}</div>
        <div aria-label="Price">
          <span>{product.priceText}</span>
          {product.listPrice && product.price && product.listPrice > product.price && (
            <span className={style["special-price"]}>{product.listPrice}</span>
          )}
        </div>
      </div>
      {children}
    </SerpElement>
  )
}
