import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import type { Product } from "@/types"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"

type Props = {
  hit: Product
}

export default function DynamicCardProduct({ hit }: Props) {
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
