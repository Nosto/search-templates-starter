import { defaultConfig } from "@/config"
import { getCurrentUrlState } from "@/mapping/url/getCurrentUrlState"

export function createQueryFromUrl() {
  const { filter, page, query, size, sort } = getCurrentUrlState()

  return {
    query,
    products: {
      from: page ? (page - 1) * (size || defaultConfig.serpSize) : 0,
      filter,
      sort,
      size: size || defaultConfig.serpSize
    }
  }
}
