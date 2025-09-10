export const mockCategoryFacet = {
  id: "category",
  name: "Category",
  field: "categories",
  type: "terms",
  data: [
    { value: "shoes", count: 42, selected: false },
    { value: "clothing", count: 28, selected: true },
    { value: "accessories", count: 15, selected: false }
  ]
} as const

export const mockBrandFacet = {
  id: "brand",
  name: "Brand",
  field: "brand",
  type: "terms",
  data: [
    { value: "nike", count: 125, selected: false },
    { value: "adidas", count: 98, selected: true },
    { value: "puma", count: 67, selected: false },
    { value: "reebok", count: 45, selected: false },
    { value: "new-balance", count: 34, selected: false },
    { value: "under-armour", count: 23, selected: false }
  ]
} as const

export const mockPriceFacet = {
  id: "price",
  name: "Price",
  field: "price",
  type: "stats",
  min: 10,
  max: 500
} as const

export const mockRatingFacet = {
  id: "rating",
  name: "Customer Rating",
  field: "rating",
  type: "stats",
  min: 1,
  max: 5
} as const

export const mockWeightFacet = {
  id: "weight",
  name: "Weight (kg)",
  field: "weight",
  type: "stats",
  min: 0.1,
  max: 25.0
} as const
