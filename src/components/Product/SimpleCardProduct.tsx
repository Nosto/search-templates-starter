import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import SimpleCard from "@/elements/SimpleCard/SimpleCard"
import { defaultImageSizes } from "@/constants/imageProps"

export default function SimpleCardProduct({ product }: { product: Product }) {
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
      <SimpleCard
        handle={product.handle!}
        alternate
        brand
        discount
        rating={product.ratingValue}
        sizes={defaultImageSizes}
      />
    </SerpElement>
  )
}
