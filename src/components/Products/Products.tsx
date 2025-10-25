import { pick } from "@nosto/search-js/utils"
import Product from "@/components/Product/Product"
import { useDecoratedSearchResults, useNostoAppState } from "@nosto/search-js/preact/hooks"
import style from "./Products.module.css"
import { cl } from "@nosto/search-js/utils"
import { hitDecorators } from "@/config"

/**
 * A grid container component that displays search result products using decorated search data.
 * Applies loading styles during data fetching and renders individual Product components
 * for each search result hit with configured decorators.
 *
 * @returns A product grid container with loading states and individual product cards
 */
export default function Products() {
  const { loading } = useNostoAppState(state => pick(state, "loading"))
  const { products } = useDecoratedSearchResults<typeof hitDecorators>()

  return (
    <div className={cl(style.container, loading && style.loading)}>
      {products?.hits.map((hit, index) => {
        return <Product product={hit} key={hit.productId || index} />
      })}
    </div>
  )
}
