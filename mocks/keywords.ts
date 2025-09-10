const createEmptyResponse = () => ({
  hits: [],
  total: 0
})

const createKeyword = (keyword: string, options: object = {}) => ({
  keyword,
  ...(options && "highlight" in options && options.highlight ? { _highlight: { keyword: options.highlight } } : {}),
  facets: (options && "facets" in options && options.facets) || [],
  priority: (options && "priority" in options && options.priority) || 1,
  total: (options && "total" in options && options.total) || 1
})

const createKeywordsResponse = (keywords: object[]) => ({
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
