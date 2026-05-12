import { SearchCategory } from "@nosto/nosto-js/client"
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
        className:
          "cursor-pointer rounded-[var(--ns-border-radius-3)] px-[var(--ns-space-2)] py-[var(--ns-space-1)] text-inherit no-underline transition-colors duration-200 ease-[ease] hover:bg-[var(--ns-color-focus)] focus:bg-[var(--ns-color-focus)]",
        "aria-label": `Category ${category.fullName ?? category.name}`
      }}
    >
      {category.fullName ?? category.name}
    </AutocompleteElement>
  )
}
