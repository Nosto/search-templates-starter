import { SearchKeywords } from "@nosto/nosto-js/client"
import SectionHeader from "@/elements/SectionHeader/SectionHeader"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"
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
      <SectionHeader>Suggestions</SectionHeader>
      <div className={style.keywords}>
        {keywords.hits.map((keyword, index) => (
          <Keyword key={index} keyword={keyword} onSubmit={onSubmit} />
        ))}
      </div>
    </div>
  )
}
