import { Product } from "@/types"
import { SerpElement } from "@nosto/search-js/preact/serp"
import styles from "./Product.module.css"
import SimpleProduct from "./Product"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"

function SkeletonProduct({ product }: { product: Product }) {
  return <SimpleProduct product={product} />
}

function DynamicProduct({ product }: { product: Product }) {
  return <SerpElement
      as={DynamicCard}
      hit={{
        productId: product.productId!,
        url: product.url
      }}
      componentProps={{
        placeholder: true,
        handle: product.handle!,
        template: "product-card-carousel",
        className: styles.container,
      }}
    />
}

export default function DynamicCardProduct({ product }: { product: Product }) {
  const isSkeleton = product.tags1?.includes("skeleton")

  if (isSkeleton) {
    return <SkeletonProduct product={product} />
  }

  return <DynamicProduct product={product} />
}
