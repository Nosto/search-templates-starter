import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
import style from "./Keyword.module.css"

type KeywordProps = {
  keyword: SearchKeyword
  onSubmit: (query: string) => void
}

export default function Keyword({ keyword, onSubmit }: KeywordProps) {
  return (
    <AutocompleteElement
      hit={keyword}
      componentProps={{
        className: style.keyword,
        onClick: (e: Event) => {
          e.preventDefault()
          onSubmit(keyword.keyword)
        }
      }}
    >
      {keyword?._highlight?.keyword ? (
        <span dangerouslySetInnerHTML={{ __html: keyword._highlight.keyword }} />
      ) : (
        keyword.keyword
      )}
    </AutocompleteElement>
  )
}
