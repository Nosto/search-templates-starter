import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { productImagePlaceholder } from "../../helpers"
import style from "../../styles/components/autocompleteProduct.module.css"
import { SearchProduct } from "@nosto/nosto-js/client"

export default function Product({ hit }: { hit: SearchProduct }) {
  return (
    <AutocompleteElement
      key={hit.productId}
      hit={{
        productId: hit.productId!,
        url: hit.url
      }}
    >
      <div data-url={hit.url} className={style.container} data-nosto-element="product">
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
              <span className={style.strikedPrice}>{hit.listPrice}</span>
            )}
          </div>
        </div>
      </div>
    </AutocompleteElement>
  )
}
