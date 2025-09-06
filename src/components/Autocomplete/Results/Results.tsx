import { useResponse } from "@nosto/search-js/preact/hooks"
import Button from "@/elements/Button/Button"
import style from "./Results.module.css"
import Product from "@/components/Autocomplete/Product/Product"

export default function Results() {
  const { keywords, products } = useResponse()

  if (!keywords?.hits?.length && !products?.hits?.length) {
    return
  }

  return (
    <div className={style.autocomplete} data-nosto-element="autocomplete">
      <div className={style.container}>
        <div className={style.items}>
          {keywords?.hits?.length > 0 && (
            <div className={style.keywords}>
              {keywords.hits.map((keyword, index) => (
                <a key={index} href={`?q=${encodeURIComponent(keyword.keyword)}`} className={style.keyword}>
                  {keyword.keyword}
                </a>
              ))}
            </div>
          )}
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
