import { SearchKeywords } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
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
      <Heading>Suggestions</Heading>
      <div className={style.keywords}>
        {keywords.hits.map((keyword, index) => (
          <Keyword key={index} keyword={keyword} onSubmit={onSubmit} />
        ))}
      </div>
    </div>
  )
}
