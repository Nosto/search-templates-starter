import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import type { Product } from "@/types"
import DynamicCard from "@/elements/DynamicCard/DynamicCard"

type Props = {
  hit: Product
}

/**
 * Renders a Shopify dynamic-card autocomplete product result. Keep the AutocompleteElement wrapper in place so Nosto search analytics can track product clicks.
 */
export default function DynamicCardProduct({ hit }: Props) {
  return (
    <AutocompleteElement
      key={hit.productId}
      as={DynamicCard}
      hit={{
        productId: hit.productId!,
        url: hit.url
      }}
      componentProps={{
        handle: hit.handle!,
        template: "card"
      }}
    />
  )
}
