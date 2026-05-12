import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { styles } from "./Product.styles"
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
        className: styles.container,
        href: hit.url
      }}
    >
      <img className={styles.image} src={hit.imageUrl} alt={hit.name} />
      <div className={styles.details} data-nosto-element="product">
        {hit.brand && <div>{hit.brand}</div>}
        <div className={styles.name}>{hit.name}</div>
        <div className={styles.price}>
          <span>{hit.priceText}</span>
          {hit.listPrice && hit.price && hit.listPrice > hit.price && (
            <span className={styles.strikedPrice}>{hit.listPriceText}</span>
          )}
        </div>
      </div>
    </AutocompleteElement>
  )
}
