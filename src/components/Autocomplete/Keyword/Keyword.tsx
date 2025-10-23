import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import { SearchKeyword } from "@nosto/nosto-js/client"
import style from "./Keyword.module.css"
import { UseRovingFocusResult } from "@/hooks/useRovingFocus"
import { useEffect, useCallback } from "preact/hooks"

type KeywordProps = {
  keyword: SearchKeyword
  onSubmit: (query: string) => void
  rovingFocus: UseRovingFocusResult
  itemIndex: number
}

export default function Keyword({ keyword, onSubmit, rovingFocus, itemIndex }: KeywordProps) {
  const focusProps = rovingFocus.getFocusProps(`keyword-${keyword.keyword}`, itemIndex)

  const handleSelect = useCallback(() => {
    if (keyword._redirect) {
      window.location.href = keyword._redirect
    } else {
      onSubmit(keyword.keyword)
    }
  }, [keyword._redirect, keyword.keyword, onSubmit])

  // Set the onSelect callback when the component mounts/updates
  useEffect(() => {
    rovingFocus.registerItem({
      id: `keyword-${keyword.keyword}`,
      element: null as unknown as HTMLElement, // Will be set by ref
      onSelect: handleSelect
    })
  }, [keyword.keyword, rovingFocus, handleSelect])

  return (
    <AutocompleteElement
      hit={keyword}
      componentProps={{
        className: style.keyword,
        onClick: (e: Event) => {
          e.preventDefault()
          handleSelect()
        },
        ...focusProps
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
