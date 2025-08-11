import { AutocompletePageProvider } from "@nosto/search-js/preact/autocomplete"
import { useActions } from "@nosto/search-js/preact/hooks"
import AutocompleteWrapper from "@/components/Autocomplete/Autocomplete"
import { autocompleteConfig } from "@/config"

export function Search() {
  const { newSearch } = useActions()

  const onSearch = (value: string) => {
    newSearch({
      query: value,
      products: {
        size: 24
      }
    })
  }

  return (
    <div>
      <div className="flex gap-1 w-full justify-center">
        <AutocompletePageProvider config={autocompleteConfig}>
          <AutocompleteWrapper onSubmit={onSearch} />
        </AutocompletePageProvider>
      </div>
    </div>
  )
}
