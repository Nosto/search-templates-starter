import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchPopularSearch } from "@nosto/nosto-js/client"
import { autocompleteItemStyles as styles } from "@/styles/classNames"
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
        className: styles.item,
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
