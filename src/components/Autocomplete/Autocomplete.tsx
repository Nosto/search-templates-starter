import { useDecoratedSearchResults } from "@nosto/search-js/preact/hooks"
import { Button } from "../elements"
import style from "../../styles/components/autocomplete.module.css"
import Product from "./Product"

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
              <div className={style.buttons}>
                <Button className={style.button} name="action">
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
