import { SearchInput } from "@nosto/search-js/preact/autocomplete"
import Icon from "@/elements/Icon/Icon"
import styles from "./SearchBar.module.css"
import { Ref } from "preact"

type Props = {
  value: string
  id?: string
  name?: string
  placeholder?: string
  onSearchInput: (target: HTMLInputElement) => void
  onFocus?: () => void
  searchInputRef?: Ref<HTMLInputElement>
}

export default function SearchBar({
  value,
  id,
  name,
  placeholder = "Search",
  onSearchInput,
  onFocus,
  searchInputRef
}: Props) {
  return (
    <div className={styles.searchBar}>
      <Icon name="search" className={styles.searchIcon} />
      <SearchInput
        onSearchInput={onSearchInput}
        componentProps={{
          value,
          id,
          name,
          placeholder,
          onFocus,
          type: "text",
          ref: searchInputRef,
          className: styles.searchInput
        }}
      />
    </div>
  )
}
