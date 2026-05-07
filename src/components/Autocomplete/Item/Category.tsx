import { SearchCategory } from "@nosto/nosto-js/client"
import styles from "./Item.module.css"
import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"

type CategoryProps = {
  category: SearchCategory
}

/**
 * Renders an autocomplete category result. Keep the AutocompleteElement wrapper in place so Nosto search analytics can track category clicks.
 */
export default function Category({ category }: CategoryProps) {
  return (
    <AutocompleteElement
      key={category.url}
      hit={category}
      as="a"
      componentProps={{
        href: category.url,
        className: styles.item,
        "aria-label": `Category ${category.fullName ?? category.name}`
      }}
    >
      {category.fullName ?? category.name}
    </AutocompleteElement>
  )
}
