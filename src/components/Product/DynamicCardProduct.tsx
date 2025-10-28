import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"

export default function DynamicCardProduct({ product }: { product: Product }) {
  return (
    <SerpElement
      as={DynamicCard}
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        handle: product.handle!,
        template: "card",
        className: styles.container
      }}
    />
  )
}
