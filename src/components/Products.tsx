import { pick } from "@nosto/search-js/utils"
import Product from "./Product"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Serp.module.css"

export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults()

  return (
    <div className={style.container} style={loading ? "opacity: 0.3;" : ""}>
      {products?.hits.map((hit, index) => {
        return <Product product={hit} key={hit.productId || index} />
      })}
    </div>
  )
}
