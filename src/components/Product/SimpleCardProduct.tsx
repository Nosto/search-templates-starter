import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import SimpleCard from "@/elements/SimpleCard/SimpleCard"

export default function SimpleCardProduct({ product }: { product: Product }) {
  return (
    <SerpElement
      as={SimpleCard}
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        handle: product.handle!,
        className: styles.container
      }}
    />
  )
}
