export const mockKeyword = {
  keyword: "running shoes",
  _highlight: {
    keyword: "<b>running</b> shoes"
  },
  facets: [],
  priority: 1,
  total: 1
}

export const mockKeywordNoHighlight = {
  keyword: "sneakers",
  facets: [],
  priority: 1,
  total: 1
}

export const mockKeywords = {
  hits: [
    {
      keyword: "running shoes",
      _highlight: {
        keyword: "<b>running</b> shoes"
      },
      facets: [],
      priority: 1,
      total: 3
    },
    {
      keyword: "running gear",
      _highlight: {
        keyword: "<b>running</b> gear"
      },
      facets: [],
      priority: 2,
      total: 3
    },
    {
      keyword: "marathon training",
      _highlight: {
        keyword: "marathon training"
      },
      facets: [],
      priority: 3,
      total: 3
    }
  ],
  total: 3
}

export const mockEmptyKeywords = {
  hits: [],
  total: 0
}