import { pick } from "@nosto/search-js/utils"
import Product from "@/components/Product/Product"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"

export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults()

  return (
    <div className={cl(style.container, loading && style.loading)}>
      {products?.hits.map((hit, index) => {
        return <Product product={hit} key={hit.productId || index} />
      })}
    </div>
  )
}
