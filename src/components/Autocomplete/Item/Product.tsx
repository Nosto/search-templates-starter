import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import type { Product } from "@/types"

type Props = {
  hit: Product
}

/**
 * Renders an autocomplete product result. Keep the AutocompleteElement wrapper in place so Nosto search analytics can track product clicks.
 */
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
        className:
          "flex cursor-pointer flex-col p-[var(--ns-space-2)] text-inherit no-underline focus:bg-[var(--ns-color-focus)]",
        href: hit.url
      }}
    >
      <img
        className={"h-auto w-full object-contain aspect-[var(--ns-aspect-ratio)]"}
        src={hit.imageUrl}
        alt={hit.name}
      />
      <div
        className={"pt-[var(--ns-space-2)] text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]"}
        data-nosto-element="product"
      >
        {hit.brand && <div>{hit.brand}</div>}
        <div
          className={
            "mb-[var(--ns-space-1)] overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] [line-clamp:1]"
          }
        >
          {hit.name}
        </div>
        <div className={"font-bold"}>
          <span>{hit.priceText}</span>
          {hit.listPrice && hit.price && hit.listPrice > hit.price && (
            <span className={"ml-[var(--ns-space-2)] line-through"}>{hit.listPriceText}</span>
          )}
        </div>
      </div>
    </AutocompleteElement>
  )
}
