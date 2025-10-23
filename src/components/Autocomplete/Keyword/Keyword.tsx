import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
import style from "./Keyword.module.css"

type KeywordProps = {
  keyword: SearchKeyword
  onSubmit: (query: string) => void
}

export default function Keyword({ keyword, onSubmit }: KeywordProps) {
  const handleClick = () => {
    if (keyword._redirect) {
      window.location.href = keyword._redirect
    } else {
      onSubmit(keyword.keyword)
    }
  }

  return (
    <AutocompleteElement
      hit={keyword}
      componentProps={{
        "data-autocomplete-item": true,
        className: style.keyword,
        onClick: (e: Event) => {
          e.preventDefault()
          handleClick()
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
