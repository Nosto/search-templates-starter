import { useResponse } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"
import style from "./Results.module.css"
import Product from "@/components/Autocomplete/Product/Product"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"

export default function Results() {
  const { keywords, products } = useResponse()

  if (!keywords?.hits?.length && !products?.hits?.length) {
    return
  }

  return (
    <div className={style.autocomplete} data-nosto-element="autocomplete">
      <div className={style.container}>
        <div className={style.items}>
          <Keyword keywords={keywords?.hits || []} />
          {products?.hits?.length > 0 && (
            <div>
              <div className={style.products}>
                {products.hits.map(hit => (
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
