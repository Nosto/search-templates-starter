import { SearchKeywords, SearchKeyword } from "@nosto/nosto-js/client"

function createEmptyResponse() {
  return {
    hits: [],
    total: 0
  } satisfies SearchKeywords
}

function createMockKeyword(overrides: Partial<SearchKeyword> & { keyword: string }) {
  return {
    facets: [],
    priority: 1,
    total: 1,
    ...overrides
  } satisfies SearchKeyword
}

function createKeywordsResponse(keywords: SearchKeyword[]) {
  return {
    hits: keywords,
    total: keywords.length
  } satisfies SearchKeywords
}

export const mockKeyword = createMockKeyword({
  keyword: "running shoes",
  _highlight: { keyword: "<b>running</b> shoes" }
})

export const mockKeywordNoHighlight = createMockKeyword({ keyword: "sneakers" })

export const mockKeywords = createKeywordsResponse([
  createMockKeyword({
    keyword: "running shoes",
    _highlight: { keyword: "<b>running</b> shoes" },
    total: 3
  }),
  createMockKeyword({
    keyword: "running gear",
    _highlight: { keyword: "<b>running</b> gear" },
    priority: 2,
    total: 3
  }),
  createMockKeyword({
    keyword: "marathon training",
    _highlight: { keyword: "marathon training" },
    priority: 3,
    total: 3
  }),
  createMockKeyword({
    keyword: "sale items",
    _redirect: "https://example.com/sale-items",
    _highlight: { keyword: "<b>sale</b> items" },
    priority: 4,
    total: 2
  }),
  createMockKeyword({
    keyword: "clearance",
    _redirect: "https://example.com/clearance",
    _highlight: { keyword: "<b>clearance</b>" },
    priority: 5,
    total: 2
  })
])

const sampleKeywords = [
  "running shoes",
  "sneakers",
  "sale items",
  "marathon training",
  "trail gear",
  "clearance",
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
      createMockKeyword({
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
