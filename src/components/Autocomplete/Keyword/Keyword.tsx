import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
import style from "./Keyword.module.css"
import { UseRovingFocusResult } from "@/hooks/useRovingFocus"
import { useCallback, useRef } from "preact/hooks"

type KeywordProps = {
  keyword: SearchKeyword
  onSubmit: (query: string) => void
  rovingFocus: UseRovingFocusResult
}

export default function Keyword({ keyword, onSubmit, rovingFocus }: KeywordProps) {
  const elementRef = useRef<HTMLElement>(null)

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
        tabIndex: elementRef.current ? rovingFocus.getTabIndex(elementRef.current) : -1,
        ref: elementRef,
        onClick: (e: Event) => {
          e.preventDefault()
          handleSelect()
        },
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleSelect()
          } else {
            rovingFocus.handleKeyDown(e)
          }
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
