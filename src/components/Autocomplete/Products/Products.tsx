import { useDecoratedSearchResults } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"
import style from "./Products.module.css"
import Product from "@/components/Autocomplete/Product/Product"

export default function Autocomplete() {
  const { products } = useDecoratedSearchResults()

  if (!products?.hits?.length) {
    return
  }

  return (
    <div className={style.autocomplete} data-nosto-element="autocomplete">
      <div className={style.container}>
        <div className={style.items}>
          {products?.hits?.length > 0 && (
            <div>
              <div className={style.products}>
                {products?.hits?.map(hit => (
                  <Product key={hit.productId} hit={hit} />
                ))}
              </div>
              <div className={style.button}>
                <Button type="submit" className={style.submit}>
                  See all search results
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
