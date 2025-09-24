import { SearchKeywords, SearchKeyword, SearchFacet } from "@nosto/nosto-js/client"

function createEmptyResponse() {
  return {
    hits: [],
    total: 0
  } satisfies SearchKeywords
}

function createKeyword(
  keyword: string,
  options: { highlight?: string; facets?: SearchFacet[]; priority?: number; total?: number } = {}
) {
  return {
    keyword,
    ...(options.highlight ? { _highlight: { keyword: options.highlight } } : {}),
    facets: options.facets || [],
    priority: options.priority || 1,
    total: options.total || 1
  } satisfies SearchKeyword
}

function createKeywordsResponse(keywords: SearchKeyword[]) {
  return {
    hits: keywords,
    total: keywords.length
  } satisfies SearchKeywords
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

const sampleKeywords = [
  "running shoes",
  "sneakers",
  "marathon training",
  "trail gear",
  "fitness tracker",
  "yoga mat",
  "cycling jersey",
  "sports watch",
  "compression socks",
  "hydration pack",
  "gym bag",
  "tennis racket",
  "swim goggles",
  "basketball",
  "soccer cleats"
]

function getRandomKeyword(index: number) {
  // Cycle through sampleKeywords, fallback to "keyword N" if count exceeds samples
  return sampleKeywords[index % sampleKeywords.length] || `keyword ${index + 1}`
}

export function generateMockKeywords(count: number) {
  const keywords: SearchKeyword[] = []
  for (let i = 0; i < count; i++) {
    const keyword = getRandomKeyword(i)
    keywords.push(
      createKeyword(keyword, {
        highlight: keyword.replace(/(\w+)/, "<b>$1</b>"),
        priority: i + 1,
        total: count
      })
    )
  }
  return keywords
}

export const mockEmptyKeywords = createEmptyResponse()
