import { pick } from "@nosto/search-js/utils"
import Product from "./Product"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"

export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults()

  return (
    <div class="ns-d-flex ns-flex-wrap" style={loading ? "opacity: 0.3;" : ""}>
      {products?.hits.map((hit, index) => {
        return <Product product={hit} key={hit.productId || index} />
      })}
    </div>
  )
}
