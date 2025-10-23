import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
import style from "./Keyword.module.css"
import { useCallback } from "preact/hooks"

type KeywordProps = {
  keyword: SearchKeyword
  onSubmit: (query: string) => void
}

export default function Keyword({ keyword, onSubmit }: KeywordProps) {
  const handleSelect = useCallback(() => {
    if (keyword._redirect) {
      window.location.href = keyword._redirect
    } else {
      onSubmit(keyword.keyword)
    }
  }, [keyword._redirect, keyword.keyword, onSubmit])

  return (
    <AutocompleteElement
      hit={keyword}
      componentProps={{
        className: style.keyword,
        onClick: (e: Event) => {
          e.preventDefault()
          handleSelect()
        },
        ...({ "data-roving-focus-item": "true" } as Record<string, unknown>)
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
