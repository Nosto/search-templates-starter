import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import { useActions, useNostoAppState } from "@nosto/search-js/preact/hooks"
import { useState } from "preact/hooks"

export function Search() {
  const [input, setInput] = useState("")
  const { newSearch } = useActions()

  const onSearch = () => {
    newSearch({
      query: input
    })
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 4, width: "100%", justifyContent: "center" }}>
        <SearchInput onSearchInput={target => setInput(target.value)} />
        <input type="button" value="Search" onClick={onSearch} />
      </div>
    </div>
  )
}
