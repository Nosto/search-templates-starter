/**
 * Utility functions for creating mock data with common shapes
 * 
 * This module provides reusable utilities to eliminate code duplication
 * across mock data files by providing consistent patterns for:
 * - Terms and stats facets
 * - Keyword responses  
 * - Product responses
 * - Empty responses
 */

// Types for facets
type FacetDataItem = {
  value: string
  count: number
  selected: boolean
}

type TermsFacet = {
  id: string
  name: string
  field: string
  type: "terms"
  data: FacetDataItem[]
}

type StatsFacet = {
  id: string
  name: string
  field: string
  type: "stats"
  min: number
  max: number
}

// Types for keywords
type KeywordHighlight = {
  keyword: string
}

type Keyword = {
  keyword: string
  _highlight?: KeywordHighlight
  facets: unknown[]
  priority: number
  total: number
}

type KeywordsResponse = {
  hits: Keyword[]
  total: number
}

// Types for responses
type ResponseCollection<T> = {
  hits: T[]
  total: number
}

// Empty response
export const createEmptyResponse = <T>(): ResponseCollection<T> => ({
  hits: [],
  total: 0
})

// Facet utilities
export const createTermsFacet = (id: string, name: string, field: string, data: FacetDataItem[]): TermsFacet => ({
  id,
  name,
  field,
  type: "terms",
  data
})

export const createStatsFacet = (id: string, name: string, field: string, min: number, max: number): StatsFacet => ({
  id,
  name,
  field,
  type: "stats",
  min,
  max
})

// Keyword utilities
export const createKeyword = (
  keyword: string,
  options: {
    highlight?: string
    facets?: unknown[]
    priority?: number
    total?: number
  } = {}
): Keyword => ({
  keyword,
  ...(options.highlight ? { _highlight: { keyword: options.highlight } } : {}),
  facets: options.facets || [],
  priority: options.priority || 1,
  total: options.total || 1
})

export const createKeywordsResponse = (keywords: Keyword[]): KeywordsResponse => ({
  hits: keywords,
  total: keywords.length
})

// Product response utility
export const createProductsResponse = <T>(products: T[]): ResponseCollection<T> => ({
  hits: products,
  total: products.length
})

// Facet data utilities
export const createFacetDataItem = (value: string, count: number, selected: boolean = false): FacetDataItem => ({
  value,
  count,
  selected
})
