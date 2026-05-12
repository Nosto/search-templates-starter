import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
import { autocompleteItemStyles as styles } from "@/styles/classNames"
import { useOnSubmit } from "../OnSubmitContext"

type KeywordProps = {
  keyword: SearchKeyword
}

/**
 * Renders an autocomplete keyword result. Keep the AutocompleteElement wrapper in place so Nosto search analytics can track keyword clicks.
 */
export default function Keyword({ keyword }: KeywordProps) {
  const onSubmit = useOnSubmit()
  return (
    <AutocompleteElement
      hit={keyword}
      componentProps={{
        className: styles.item,
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
