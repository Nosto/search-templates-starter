import { createKeyword, createKeywordsResponse, createEmptyResponse } from "./utils"

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
