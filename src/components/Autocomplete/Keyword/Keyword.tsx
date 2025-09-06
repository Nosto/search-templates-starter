import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import style from "./Keyword.module.css"

interface KeywordProps {
  keyword: { keyword: string }
}

export default function Keyword({ keyword }: KeywordProps) {
  return (
    <AutocompleteElement
      hit={keyword}
      as="a"
      componentProps={{
        href: `/search/?q=${keyword.keyword}`,
        "aria-label": `Keyword ${keyword.keyword}`,
        className: style.keyword
      }}
    >
      {keyword.keyword}
    </AutocompleteElement>
  )
}
