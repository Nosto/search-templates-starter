import { SearchKeywords } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import Keyword from "@/components/Autocomplete/Keyword/Keyword"

export type KeywordsProps = {
  keywords: SearchKeywords
}

export default function Keywords({ keywords }: KeywordsProps) {
  if (!keywords?.hits?.length) {
    return null
  }

  return (
    <div className="flex flex-col border-r border-ns-thin border-ns-grey-light min-w-[150px] p-ns-1 max-md:border-r-0 max-md:border-b max-md:min-w-auto">
      <Heading>Suggestions</Heading>
      <div className="flex flex-col">
        {keywords.hits.map((keyword, index) => (
          <Keyword key={index} keyword={keyword} />
        ))}
      </div>
    </div>
  )
}
