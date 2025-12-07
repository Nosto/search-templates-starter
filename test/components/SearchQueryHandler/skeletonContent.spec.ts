import { createSkeletonContent } from "@/components/SearchQueryHandler/skeletonContent"
import { describe, expect, it } from "vitest"

describe("skeletonContent", () => {
  it("should create an array of skeleton products with unique productIds", () => {
    const { response } = createSkeletonContent({ query: "test" })
    const productIds = response.products.hits.map(hit => hit.productId)
    const uniqueProductIds = new Set(productIds)

    expect(productIds.length).toBe(uniqueProductIds.size)
  })
})
