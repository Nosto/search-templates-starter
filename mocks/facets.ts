import { SearchTermsFacet, SearchStatsFacet, SearchFacetTerm } from "@nosto/nosto-js/client"

function createMockTermsFacet(id: string, name: string, field: string, data: SearchFacetTerm[]) {
  return {
    id,
    name,
    field,
    type: "terms",
    data
  } satisfies SearchTermsFacet
}

function createMockStatsFacet(id: string, name: string, field: string, min: number, max: number) {
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

export const mockCategoryFacet = createMockTermsFacet("category", "Category", "categories", [
  createFacetDataItem("shoes", 42),
  createFacetDataItem("clothing", 28, true),
  createFacetDataItem("accessories", 15)
])

export const mockBrandFacet = createMockTermsFacet("brand", "Brand", "brand", [
  createFacetDataItem("nike", 125),
  createFacetDataItem("adidas", 98, true),
  createFacetDataItem("puma", 67),
  createFacetDataItem("reebok", 45),
  createFacetDataItem("new-balance", 34),
  createFacetDataItem("under-armour", 23)
])

export const mockPriceFacet = createMockStatsFacet("price", "Price", "price", 10, 500)

export const mockRatingFacet = createMockStatsFacet("rating", "Customer Rating", "rating", 1, 5)

export const mockWeightFacet = createMockStatsFacet("weight", "Weight (kg)", "weight", 0.1, 25.0)
