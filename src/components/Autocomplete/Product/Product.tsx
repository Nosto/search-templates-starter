import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import style from "./Product.module.css"
import type { Product } from "@/types"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"
import { UseRovingFocusResult } from "@/hooks/useRovingFocus"
import { useCallback, useRef } from "preact/hooks"

type Props = {
  hit: Product
  rovingFocus?: UseRovingFocusResult
}

export default function Product({ hit, rovingFocus }: Props) {
  const elementRef = useRef<HTMLAnchorElement>(null)

  const handleSelect = useCallback(() => {
    if (hit.url) {
      window.location.href = hit.url
    }
  }, [hit.url])

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
        tabIndex: rovingFocus && elementRef.current ? rovingFocus.getTabIndex(elementRef.current) : -1,
        ref: elementRef,
        onClick: handleSelect,
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleSelect()
          } else if (rovingFocus) {
            rovingFocus.handleKeyDown(e)
          }
        },
        ...({ "data-roving-focus-item": "true" } as Record<string, unknown>)
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
