import { SearchResponse } from "@nosto/search-js"
import SectionHeader from "@/elements/SectionHeader/SectionHeader"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"
import style from "./Results.module.css"

export interface KeywordsProps {
  keywords: SearchResponse["keywords"]
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
