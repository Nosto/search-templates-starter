import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
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
        className:
          "cursor-pointer rounded-[var(--ns-border-radius-3)] px-[var(--ns-space-2)] py-[var(--ns-space-1)] text-inherit no-underline transition-colors duration-200 ease-[ease] hover:bg-[var(--ns-color-focus)] focus:bg-[var(--ns-color-focus)]",
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
