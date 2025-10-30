import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
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
        className:
          "p-ns-1 px-ns-2 no-underline rounded-ns-3 transition-[background-color_0.2s_ease] cursor-pointer focus:bg-ns-focus hover:bg-ns-focus",
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
