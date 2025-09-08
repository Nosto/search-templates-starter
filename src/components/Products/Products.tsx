import { pick } from "@nosto/search-js/utils"
import Product from "@/components/Product/Product"
import Skeleton from "@/elements/Skeleton/Skeleton"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators, defaultConfig } from "@/config"

export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()

  return (
    <div className={cl(style.container, loading && style.loading)}>
      {loading && defaultConfig.useSkeletonLoading && (!products?.hits || products.hits.length === 0)
        ? Array.from({ length: defaultConfig.serpSize }).map((_, index) => <Skeleton key={`skeleton-${index}`} />)
        : products?.hits.map((hit, index) => {
            return <Product product={hit} key={hit.productId || index} />
          })}
    </div>
  )
}
