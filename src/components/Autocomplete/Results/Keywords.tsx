import { SearchKeywords } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"
import style from "./Results.module.css"

export type KeywordsProps = {
  keywords: SearchKeywords
}

export default function Keywords({ keywords }: KeywordsProps) {
  if (!keywords?.hits?.length) {
    return null
  }

  return (
    <div className={style.suggestionsColumn}>
      <Heading>Suggestions</Heading>
      <div className={style.keywords}>
        {keywords.hits.map((keyword, index) => (
          <Keyword key={index} keyword={keyword} />
        ))}
      </div>
    </div>
  )
}
