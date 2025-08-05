import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { useDecoratedSearchResults } from "@nosto/search-js/preact/hooks"
import { SubmitButton } from "../elements"
import { productImagePlaceholder } from "../../helpers"
import style from "./Autocomplete.module.css"

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
                {products?.hits?.map(hit => {
                  return (
                    <AutocompleteElement
                      key={hit.productId}
                      hit={{
                        productId: hit.productId!,
                        url: hit.url
                      }}
                    >
                      <div data-url={hit.url} className={style.product} data-nosto-element="product">
                        <img
                          className={style.image}
                          src={hit.imageUrl ?? productImagePlaceholder}
                          alt={hit.name}
                          width="60"
                          height="40"
                        />
                        <div className={style.details}>
                          {hit.brand && <div>{hit.brand}</div>}
                          <div className={style.name}>{hit.name}</div>
                          <div>
                            <span>{hit.priceText}</span>
                            {hit.listPrice && hit.price && hit.listPrice > hit.price && (
                              <span className={style.oldPrice}>{hit.listPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AutocompleteElement>
                  )
                })}
              </div>
              <SubmitButton text="See all search results" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
