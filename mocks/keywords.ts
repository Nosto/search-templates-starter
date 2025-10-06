import { SearchKeywords, SearchKeyword } from "@nosto/nosto-js/client"

function createEmptyResponse() {
  return {
    hits: [],
    total: 0
  } satisfies SearchKeywords
}

function createKeyword(keyword: Partial<SearchKeyword> & { keyword: string }) {
  return {
    facets: [],
    priority: 1,
    total: 1,
    ...keyword,
    ...(keyword._highlight ? { _highlight: keyword._highlight } : {}),
    ...(keyword._redirect ? { _redirect: keyword._redirect } : {})
  } satisfies SearchKeyword
}

function createKeywordsResponse(keywords: SearchKeyword[]) {
  return {
    hits: keywords,
    total: keywords.length
  } satisfies SearchKeywords
}

export const mockKeyword = createKeyword({
  keyword: "running shoes",
  _highlight: { keyword: "<b>running</b> shoes" }
})

export const mockKeywordNoHighlight = createKeyword({ keyword: "sneakers" })

export const mockKeywords = createKeywordsResponse([
  createKeyword({
    keyword: "running shoes",
    _highlight: { keyword: "<b>running</b> shoes" },
    total: 3
  }),
  createKeyword({
    keyword: "running gear",
    _highlight: { keyword: "<b>running</b> gear" },
    priority: 2,
    total: 3
  }),
  createKeyword({
    keyword: "marathon training",
    _highlight: { keyword: "marathon training" },
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
      createKeyword({
        keyword,
        _highlight: { keyword: keyword.replace(/(\w+)/, "<b>$1</b>") },
        priority: i + 1,
        total: count
      })
    )
  }
  return keywords
}

export const mockEmptyKeywords = createEmptyResponse()
