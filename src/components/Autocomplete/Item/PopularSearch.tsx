import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchPopularSearch } from "@nosto/nosto-js/client"
import style from "./Item.module.css"
import { useOnSubmit } from "../OnSubmitContext"

type PopularSearchProps = {
  search: SearchPopularSearch
}

export default function PopularSearch({ search }: PopularSearchProps) {
  const onSubmit = useOnSubmit()
  return (
    <AutocompleteElement
      hit={{ keyword: search.query! }}
      componentProps={{
        className: style.item,
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
