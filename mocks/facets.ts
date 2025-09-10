import { SearchTermsFacet, SearchStatsFacet, SearchFacetTerm } from "@nosto/nosto-js/client"

const createTermsFacet = (id: string, name: string, field: string, data: SearchFacetTerm[]): SearchTermsFacet => ({
  id,
  name,
  field,
  type: "terms",
  data
})

const createStatsFacet = (id: string, name: string, field: string, min: number, max: number): SearchStatsFacet => ({
  id,
  name,
  field,
  type: "stats",
  min,
  max
})

const createFacetDataItem = (value: string, count: number, selected = false): SearchFacetTerm => ({
  value,
  count,
  selected
})

export const mockCategoryFacet = createTermsFacet("category", "Category", "categories", [
  createFacetDataItem("shoes", 42),
  createFacetDataItem("clothing", 28, true),
  createFacetDataItem("accessories", 15)
])

export const mockBrandFacet = createTermsFacet("brand", "Brand", "brand", [
  createFacetDataItem("nike", 125),
  createFacetDataItem("adidas", 98, true),
  createFacetDataItem("puma", 67),
  createFacetDataItem("reebok", 45),
  createFacetDataItem("new-balance", 34),
  createFacetDataItem("under-armour", 23)
])

export const mockPriceFacet = createStatsFacet("price", "Price", "price", 10, 500)

export const mockRatingFacet = createStatsFacet("rating", "Customer Rating", "rating", 1, 5)

export const mockWeightFacet = createStatsFacet("weight", "Weight (kg)", "weight", 0.1, 25.0)
