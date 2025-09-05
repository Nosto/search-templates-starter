import { pick } from "@nosto/search-js/utils"
import Product from "@/components/Product/Product"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators, defaultConfig } from "@/config"

export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()

  // Show skeleton placeholders when loading with skeleton enabled
  if (loading && defaultConfig.useSkeletonLoading && (!products?.hits || products.hits.length === 0)) {
    return (
      <div className={cl(style.container, loading && style.loading)}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Product
            key={`skeleton-${index}`}
            product={{} as any}
            loading={loading}
            useSkeleton={defaultConfig.useSkeletonLoading}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cl(style.container, loading && style.loading)}>
      {products?.hits.map((hit, index) => {
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
