import { SearchKeywords } from "@nosto/nosto-js/client"
import { AutocompleteElement } from "@nosto/search-js/preact/autocomplete"
import Heading from "@/elements/Heading/Heading"
import Pill from "@/elements/Pill/Pill"
import styles from "./Keywords.module.css"

export type KeywordsProps = {
  keywords: SearchKeywords
  onSubmit: (query: string) => void
}

export default function Keywords({ keywords, onSubmit }: KeywordsProps) {
  if (!keywords?.hits?.length) {
    return null
  }

  return (
    <div className={styles.keywordsSection}>
      <Heading>Suggestions</Heading>
      <div className={styles.pillContainer}>
        {keywords.hits.map((keyword, index) => (
          <AutocompleteElement
            key={index}
            hit={keyword}
            componentProps={{
              style: { all: "unset" }
            }}
          >
            <Pill
              onClick={(e: Event) => {
                e.preventDefault()
                if (keyword._redirect) {
                  window.location.href = keyword._redirect
                } else {
                  onSubmit(keyword.keyword)
                }
              }}
            >
              {keyword?._highlight?.keyword ? (
                <span dangerouslySetInnerHTML={{ __html: keyword._highlight.keyword }} />
              ) : (
                keyword.keyword
              )}
            </Pill>
          </AutocompleteElement>
        ))}
      </div>
    </div>
  )
}
