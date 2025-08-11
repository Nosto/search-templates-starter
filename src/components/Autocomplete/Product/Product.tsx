import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { productImagePlaceholder } from "@/helpers"
import { SearchProduct } from "@nosto/nosto-js/client"

type Props = {
  hit: SearchProduct
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
      <div data-url={hit.url} className="flex flex-row cursor-pointer p-ns-2" data-nosto-element="product">
        <img
          className="h-auto object-contain w-[60px] aspect-[60/40]"
          src={hit.imageUrl ?? productImagePlaceholder}
          alt={hit.name}
        />
        <div className="pl-ns-2 text-ns-black text-ns-4">
          {hit.brand && <div>{hit.brand}</div>}
          <div className="overflow-hidden text-ellipsis line-clamp-1">{hit.name}</div>
          <div>
            <span>{hit.priceText}</span>
            {hit.listPrice && hit.price && hit.listPrice > hit.price && (
              <span className="line-through ml-ns-2">{hit.listPrice}</span>
            )}
          </div>
        </div>
      </div>
    </AutocompleteElement>
  )
}
