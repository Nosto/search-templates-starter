import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import style from "./Keyword.module.css"

interface KeywordProps {
  keyword: { keyword: string }
  onSubmit: (query: string) => void
}

export default function Keyword({ keyword, onSubmit }: KeywordProps) {
  return (
    <AutocompleteElement
      hit={keyword}
      as="a"
      componentProps={{
        href: `/search/?q=${keyword.keyword}`,
        "aria-label": `Keyword ${keyword.keyword}`,
        className: style.keyword,
        onClick: (e: Event) => {
          e.preventDefault()
          onSubmit(keyword.keyword)
        }
      }}
    >
      {keyword.keyword}
    </AutocompleteElement>
  )
}
