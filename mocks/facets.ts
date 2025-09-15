import { SearchTermsFacet, SearchStatsFacet, SearchFacetTerm } from "@nosto/nosto-js/client"

function createTermsFacet(id: string, name: string, field: string, data: SearchFacetTerm[]) {
  return {
    id,
    name,
    field,
    type: "terms",
    data
  } satisfies SearchTermsFacet
}

function createStatsFacet(id: string, name: string, field: string, min: number, max: number) {
  return {
    id,
    name,
    field,
    type: "stats",
    min,
    max
  } satisfies SearchStatsFacet
}

function createFacetDataItem(value: string, count: number, selected = false) {
  return {
    value,
    count,
    selected
  } satisfies SearchFacetTerm
}

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

export function generateMockFacets(amount: number) {
  const allFacets = [mockCategoryFacet, mockBrandFacet, mockPriceFacet, mockRatingFacet, mockWeightFacet]
  return allFacets.slice(0, amount)
}
