import { describe, it, expect } from "vitest"
import { findSortOptionId, createSortOption } from "@/utils/sorting"
import type { InputSearchSort } from "@nosto/nosto-js/client"

describe("sorting utilities", () => {
  describe("findSortOptionId", () => {
    const sortOptions = [
      createSortOption("score", "Most relevant", { field: "_score", order: "desc" }),
      createSortOption("-price", "Price descending", { field: "price", order: "desc" }),
      createSortOption("price", "Price ascending", { field: "price", order: "asc" }),
      createSortOption("name", "Name A-Z", { field: "name", order: "asc" })
    ]

    it("finds matching sort option ID for single sort", () => {
      const sort: InputSearchSort[] = [{ field: "price", order: "asc" }]
      const result = findSortOptionId(sort, sortOptions)
      expect(result).toBe("price")
    })

    it("finds matching sort option ID for multiple sorts", () => {
      const sort: InputSearchSort[] = [{ field: "_score", order: "desc" }]
      const result = findSortOptionId(sort, sortOptions)
      expect(result).toBe("score")
    })

    it("returns undefined for non-matching sort", () => {
      const sort: InputSearchSort[] = [{ field: "unknown", order: "asc" }]
      const result = findSortOptionId(sort, sortOptions)
      expect(result).toBeUndefined()
    })

    it("returns undefined for empty sort array", () => {
      const sort: InputSearchSort[] = []
      const result = findSortOptionId(sort, sortOptions)
      expect(result).toBeUndefined()
    })

    it("handles exact matches with different order", () => {
      const sort: InputSearchSort[] = [{ field: "price", order: "desc" }]
      const result = findSortOptionId(sort, sortOptions)
      expect(result).toBe("-price")
    })
  })
})
