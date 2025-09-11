import { SearchKeywords, SearchKeyword, SearchFacet } from "@nosto/nosto-js/client"

function createEmptyResponse(): Pick<SearchKeywords, "hits" | "total"> {
  return {
    hits: [],
    total: 0
  }
}

function createKeyword(
  keyword: string,
  options: { highlight?: string; facets?: SearchFacet[]; priority?: number; total?: number } = {}
): SearchKeyword {
  return {
    keyword,
    ...(options.highlight ? { _highlight: { keyword: options.highlight } } : {}),
    facets: options.facets || [],
    priority: options.priority || 1,
    total: options.total || 1
  }
}

function createKeywordsResponse(keywords: SearchKeyword[]): SearchKeywords {
  return {
    hits: keywords,
    total: keywords.length
  }
}

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
