import { SearchKeywords, SearchKeyword, SearchFacet } from "@nosto/nosto-js/client"

const createEmptyResponse = (): Pick<SearchKeywords, "hits" | "total"> => ({
  hits: [],
  total: 0
})

const createKeyword = (
  keyword: string,
  options: { highlight?: string; facets?: SearchFacet[]; priority?: number; total?: number } = {}
): SearchKeyword => ({
  keyword,
  ...(options.highlight ? { _highlight: { keyword: options.highlight } } : {}),
  facets: options.facets || [],
  priority: options.priority || 1,
  total: options.total || 1
})

const createKeywordsResponse = (keywords: SearchKeyword[]): SearchKeywords => ({
  hits: keywords,
  total: keywords.length
})

export const mockKeyword = createKeyword("running shoes", {
  highlight: "<b>running</b> shoes"
})

export const mockKeywordNoHighlight = createKeyword("sneakers")

export const mockKeywords = createKeywordsResponse([
  createKeyword("running shoes", {
    highlight: "<b>running</b> shoes",
    total: 3
  }),
  createKeyword("running gear", {
    highlight: "<b>running</b> gear",
    priority: 2,
    total: 3
  }),
  createKeyword("marathon training", {
    highlight: "marathon training",
    priority: 3,
    total: 3
  })
])

export const mockEmptyKeywords = createEmptyResponse()
