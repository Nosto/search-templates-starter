import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
import style from "./Item.module.css"
import { useOnSubmit } from "../OnSubmitContext"

type KeywordProps = {
  keyword: SearchKeyword
}

export default function Keyword({ keyword }: KeywordProps) {
  const onSubmit = useOnSubmit()
  return (
    <AutocompleteElement
      hit={keyword}
      componentProps={{
        className: style.item,
        onClick: (e: Event) => {
          e.preventDefault()
          if (keyword._redirect) {
            window.location.href = keyword._redirect
          } else {
            onSubmit(keyword.keyword, { isKeyword: true })
          }
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
