import { SearchKeywords } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"
import { RovingFocusGroup } from "@/components/RovingFocus/RovingFocusGroup"
import { RovingFocusItem } from "@/components/RovingFocus/RovingFocusItem"
import style from "./Results.module.css"

export type KeywordsProps = {
  keywords: SearchKeywords
  onSubmit: (query: string) => void
}

export default function Keywords({ keywords, onSubmit }: KeywordsProps) {
  if (!keywords?.hits?.length) {
    return null
  }

  return (
    <div className={style.suggestionsColumn}>
      <Heading>Suggestions</Heading>
      <RovingFocusGroup orientation="vertical" loop={true}>
        <div className={style.keywords}>
          {keywords.hits.map((keyword, index) => (
            <RovingFocusItem key={index}>
              <Keyword keyword={keyword} onSubmit={onSubmit} />
            </RovingFocusItem>
          ))}
        </div>
      </RovingFocusGroup>
    </div>
  )
}
