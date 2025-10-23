import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import style from "./Product.module.css"
import type { Product } from "@/types"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import { UseRovingFocusResult } from "@/hooks/useRovingFocus"
import { useEffect, useCallback } from "preact/hooks"

type Props = {
  hit: Product
  rovingFocus?: UseRovingFocusResult
  itemIndex?: number
}

export default function Product({ hit, rovingFocus, itemIndex }: Props) {
  const focusProps =
    rovingFocus && itemIndex !== undefined ? rovingFocus.getFocusProps(`product-${hit.productId}`, itemIndex) : {}

  const handleSelect = useCallback(() => {
    if (hit.url) {
      window.location.href = hit.url
    }
  }, [hit.url])

  // Set the onSelect callback when the component mounts/updates
  useEffect(() => {
    if (rovingFocus && itemIndex !== undefined) {
      rovingFocus.registerItem({
        id: `product-${hit.productId}`,
        element: null as unknown as HTMLElement, // Will be set by ref
        onSelect: handleSelect
      })
    }
  }, [hit.productId, rovingFocus, itemIndex, handleSelect])

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
        className: style.container,
        href: hit.url,
        ...focusProps
      }}
    >
      <img className={style.image} src={hit.imageUrl} alt={hit.name} />
      <div className={style.details} data-nosto-element="product">
        {hit.brand && <div>{hit.brand}</div>}
        <div className={style.name}>{hit.name}</div>
        <div className={style.price}>
          <span>{hit.priceText}</span>
          {hit.listPrice && hit.price && hit.listPrice > hit.price && (
            <span className={style.strikedPrice}>{hit.listPriceText}</span>
          )}
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
