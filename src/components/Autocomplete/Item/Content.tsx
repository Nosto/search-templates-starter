import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import style from "./Item.module.css"
import type { Product } from "@/types"

type ContentProps = {
  content: Product
}

export default function Content({ content }: ContentProps) {
  if (!content.productId) {
    return null
  }

  return (
    <AutocompleteElement
      key={content.productId}
      hit={{
        productId: content.productId,
        url: content.url
      }}
      as="a"
      componentProps={{
        href: content.url,
        className: style.item,
        "aria-label": `Content ${content.name}`
      }}
    >
      {content.name}
    </AutocompleteElement>
  )
}
