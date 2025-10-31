import { SearchCategory } from "@nosto/nosto-js/client"
import style from "./Item.module.css"
import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"

type CategoryProps = {
  category: SearchCategory
}

export default function Category({ category }: CategoryProps) {
  return (
    <AutocompleteElement
      key={category.url}
      hit={category}
      as="a"
      componentProps={{
        href: category.url,
        className: style.item,
        "aria-label": `Category ${category.fullName ?? category.name}`
      }}
    >
      {category.fullName ?? category.name}
    </AutocompleteElement>
  )
}
