import { pick } from "@nosto/search-js/utils"
import Product from "@/components/Product/Product"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import styles from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators } from "@/config"

export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()

  return (
    <div className={cl(styles.container, loading && styles.loading)}>
      {products?.hits.map((hit, index) => {
        return <Product product={hit} key={hit.productId || index} />
      })}
    </div>
  )
}
