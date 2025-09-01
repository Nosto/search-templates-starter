import { describe, it, expect } from "vitest"
import { serializeSortToUrl, deserializeSortFromUrl, findSortOptionId, createSortOption } from "@/utils/sorting"
import type { InputSearchSort } from "@nosto/nosto-js/client"

describe("sorting utilities", () => {
  describe("serializeSortToUrl", () => {
    it("serializes single sort to URL format", () => {
      const sort: InputSearchSort[] = [{ field: "price", order: "asc" }]
      const result = serializeSortToUrl(sort)
      expect(result).toBe("price~asc")
    })

    it("serializes multiple sorts to URL format", () => {
      const sort: InputSearchSort[] = [
        { field: "price", order: "desc" },
        { field: "_score", order: "desc" }
      ]
      const result = serializeSortToUrl(sort)
      expect(result).toBe("price~desc,_score~desc")
    })

    it("handles empty sort array", () => {
      const sort: InputSearchSort[] = []
      const result = serializeSortToUrl(sort)
      expect(result).toBe("")
    })

    it("handles complex field names", () => {
      const sort: InputSearchSort[] = [
        { field: "product.price", order: "asc" },
        { field: "category_name", order: "desc" }
      ]
      const result = serializeSortToUrl(sort)
      expect(result).toBe("product.price~asc,category_name~desc")
    })
  })

  describe("deserializeSortFromUrl", () => {
    it("deserializes single sort from URL format", () => {
      const sortString = "price~asc"
      const result = deserializeSortFromUrl(sortString)
      expect(result).toEqual([{ field: "price", order: "asc" }])
    })

    it("deserializes multiple sorts from URL format", () => {
      const sortString = "price~desc,_score~desc"
      const result = deserializeSortFromUrl(sortString)
      expect(result).toEqual([
        { field: "price", order: "desc" },
        { field: "_score", order: "desc" }
      ])
    })

    it("handles empty string", () => {
      const sortString = ""
      const result = deserializeSortFromUrl(sortString)
      expect(result).toEqual([])
    })

    it("handles whitespace-only string", () => {
      const sortString = "   "
      const result = deserializeSortFromUrl(sortString)
      expect(result).toEqual([])
    })

    it("filters out invalid sort formats", () => {
      const sortString = "price~asc,invalid,_score~desc,malformed~invalid_order"
      const result = deserializeSortFromUrl(sortString)
      expect(result).toEqual([
        { field: "price", order: "asc" },
        { field: "_score", order: "desc" }
      ])
    })

    it("handles extra whitespace", () => {
      const sortString = " price~asc , _score~desc "
      const result = deserializeSortFromUrl(sortString)
      expect(result).toEqual([
        { field: "price", order: "asc" },
        { field: "_score", order: "desc" }
      ])
    })

    it("handles complex field names", () => {
      const sortString = "product.price~asc,category_name~desc"
      const result = deserializeSortFromUrl(sortString)
      expect(result).toEqual([
        { field: "product.price", order: "asc" },
        { field: "category_name", order: "desc" }
      ])
    })
  })

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

  describe("integration", () => {
    it("round-trip serialization works correctly", () => {
      const originalSort: InputSearchSort[] = [
        { field: "price", order: "desc" },
        { field: "_score", order: "desc" }
      ]
      const serialized = serializeSortToUrl(originalSort)
      const deserialized = deserializeSortFromUrl(serialized)
      expect(deserialized).toEqual(originalSort)
    })

    it("works with existing sort options", () => {
      const sortOptions = [
        createSortOption("score", "Most relevant", { field: "_score", order: "desc" }),
        createSortOption("price", "Price ascending", { field: "price", order: "asc" })
      ]

      const sort = sortOptions[1].value.sort
      const serialized = serializeSortToUrl(sort)
      const deserialized = deserializeSortFromUrl(serialized)
      const foundId = findSortOptionId(deserialized, sortOptions)

      expect(foundId).toBe("price")
    })
  })
})
