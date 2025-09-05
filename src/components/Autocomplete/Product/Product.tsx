import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { productImagePlaceholder } from "@/helpers"
import style from "./Product.module.css"
import { DecoratedProduct } from "@nosto/search-js"
import { hitDecorators } from "@/config"
import DynamicCard from "@/components/DynamicCard/DynamicCard"

type Props = {
  hit: DecoratedProduct<typeof hitDecorators>
}

export default function Product({ hit }: Props) {
  return (
    <AutocompleteElement
      key={hit.productId}
      hit={{
        productId: hit.productId!,
        url: hit.url
      }}
    >
      <div data-url={hit.url} className={style.container} data-nosto-element="product">
        <img className={style.image} src={hit.imageUrl ?? productImagePlaceholder} alt={hit.name} />
        <div className={style.details}>
          {hit.brand && <div>{hit.brand}</div>}
          <div className={style.name}>{hit.name}</div>
          <div>
            <span>{hit.priceText}</span>
            {hit.listPrice && hit.price && hit.listPrice > hit.price && (
              <span className={style.strikedPrice}>{hit.listPriceText}</span>
            )}
          </div>
        </div>
      </div>
    </AutocompleteElement>
  )
}

export function DynamicCardProduct({ hit }: Props) {
  return (
    <AutocompleteElement
      key={hit.productId}
      hit={{
        productId: hit.productId!,
        url: hit.url
      }}
    >
      <DynamicCard handle={hit.handle!} template="card" />
    </AutocompleteElement>
  )
}
