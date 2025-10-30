import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import type { Product } from "@/types"

type Props = {
  hit: Product
}

export default function Product({ hit }: Props) {
  return (
    <AutocompleteElement
      key={hit.productId}
      hit={{
        productId: hit.productId!,
        url: hit.url
      }}
      as="a"
      componentProps={{
        "aria-label": `Product ${hit.name}`,
        className: "flex flex-col cursor-pointer p-ns-2 no-underline focus:bg-ns-focus",
        href: hit.url
      }}
    >
      <img className="h-auto object-contain w-full" src={hit.imageUrl} alt={hit.name} />
      <div className="pt-ns-2 text-ns-black text-ns-4" data-nosto-element="product">
        {hit.brand && <div>{hit.brand}</div>}
        <div className="overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [line-clamp:1] [display:-webkit-box] mb-ns-1">
          {hit.name}
        </div>
        <div className="font-bold">
          <span>{hit.priceText}</span>
          {hit.listPrice && hit.price && hit.listPrice > hit.price && (
            <span className="line-through ml-ns-2">{hit.listPriceText}</span>
          )}
        </div>
      </div>
    </AutocompleteElement>
  )
}
