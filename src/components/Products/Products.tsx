import { pick } from "@nosto/search-js/utils"
import Product from "@/components/Product/Product"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators, defaultConfig } from "@/config"
import { DecoratedProduct } from "@nosto/search-js"

// Create a minimal product for skeleton mode
const createSkeletonProduct = (index: number): DecoratedProduct<typeof hitDecorators> => ({
  productId: `skeleton-${index}`,
  name: "",
  url: "",
  imageUrl: "",
  priceText: "",
  handle: `skeleton-${index}`
})

export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()

  return (
    <div className={cl(style.container, loading && style.loading)}>
      {loading && defaultConfig.useSkeletonLoading
        ? // Show skeleton loaders when loading and skeleton is enabled
          Array.from({ length: 6 }, (_, index) => (
            <Product
              key={`skeleton-${index}`}
              product={createSkeletonProduct(index)}
              loading={true}
              useSkeleton={true}
            />
          ))
        : // Show actual products or nothing when not loading or skeleton disabled
          products?.hits.map((hit, index) => {
            return (
              <Product
                product={hit}
                key={hit.productId || index}
                loading={loading}
                useSkeleton={defaultConfig.useSkeletonLoading}
              />
            )
          })}
    </div>
  )
}
