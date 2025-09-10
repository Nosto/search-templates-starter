const createTermsFacet = (id: string, name: string, field: string, data: object[]) => ({
  id,
  name,
  field,
  type: "terms" as const,
  data
})

const createStatsFacet = (id: string, name: string, field: string, min: number, max: number) => ({
  id,
  name,
  field,
  type: "stats" as const,
  min,
  max
})

const createFacetDataItem = (value: string, count: number, selected = false) => ({
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
