import { SearchKeywords } from "@nosto/nosto-js/client"
import Heading from "@/elements/Heading/Heading"
import Keyword from "@/components/Autocomplete/Item/Keyword"

export type KeywordsProps = {
  keywords: SearchKeywords
}

export default function Keywords({ keywords }: KeywordsProps) {
  if (!keywords?.hits?.length) {
    return null
  }

  return (
    <div
      className={
        "flex min-w-[150px] flex-col border-r border-[var(--ns-color-grey-light)] p-[var(--ns-space-1)] max-md:min-w-0 max-md:border-b max-md:border-r-0"
      }
    >
      <Heading>Suggestions</Heading>
      <div className={"flex flex-col"}>
        {keywords.hits.map((keyword, index) => (
          <Keyword key={index} keyword={keyword} />
        ))}
      </div>
    </div>
  )
}
