import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchPopularSearch } from "@nosto/nosto-js/client"
import { useOnSubmit } from "../OnSubmitContext"

type PopularSearchProps = {
  search: SearchPopularSearch
}

/**
 * Renders an autocomplete popular-search result. Keep the AutocompleteElement wrapper in place so Nosto search analytics can track popular-search clicks.
 */
export default function PopularSearch({ search }: PopularSearchProps) {
  const onSubmit = useOnSubmit()
  return (
    <AutocompleteElement
      hit={{ keyword: search.query! }}
      componentProps={{
        className:
          "cursor-pointer rounded-[var(--ns-border-radius-3)] px-[var(--ns-space-2)] py-[var(--ns-space-1)] text-inherit no-underline transition-colors duration-200 ease-[ease] hover:bg-[var(--ns-color-focus)] focus:bg-[var(--ns-color-focus)]",
        onClick: (e: Event) => {
          e.preventDefault()
          onSubmit(search.query!, { isPopular: true })
        }
      }}
    >
      {search.query}
    </AutocompleteElement>
  )
}
