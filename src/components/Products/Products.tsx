import { pick } from "@nosto/search-js/utils"
import Product from "@/components/Product/Product"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators } from "@/config"

export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()

  return (
    <div className={cl("grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", loading && "opacity-30")}>
      {products?.hits.map((hit, index) => {
        return <Product product={hit} key={hit.productId || index} />
      })}
    </div>
  )
}
