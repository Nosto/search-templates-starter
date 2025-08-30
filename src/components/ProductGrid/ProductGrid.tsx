import { pick } from "@nosto/search-js/utils"
import ProductCard from "@/components/ProductCard/ProductCard"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./ProductGrid.module.css"

export default function ProductGrid() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults()

  return (
    <div className={style.container} style={loading ? "opacity: 0.3;" : ""}>
      {products?.hits.map((hit, index) => {
        return <ProductCard product={hit} key={hit.productId || index} />
      })}
    </div>
  )
}
